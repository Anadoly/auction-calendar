import { useRef, useState, useMemo, useEffect } from 'react';
import { useAuctionCalender } from './resources.ts';
import { useRouter } from 'next/router';
import { calenderHeader, calenderColumn, calender, activeToday, calenderEvent } from '@styles/calender.module.css';
import { container } from '@styles/Shared.module.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';

export const Calender = () => {
  const router = useRouter();
  const swiper = useSwiper();
  const { dateFrom: queryDateFrom, dateTo: queryDateTo } = router.query;

  const [dates, setDates] = useState<{
    dateFrom: string;
    dateTo: string;
  }>({
    dateFrom: queryDateFrom || '2022-10-17T00:43:38.024Z',
    dateTo: queryDateTo || '2022-12-31T00:43:38.024Z',
  });

  const customsSlider = useRef();

  const { data: calenderData, isLoading } = useAuctionCalender({
    DateFrom: dates.dateFrom,
    DateTo: dates.dateTo,
  });

  const [dayDateFrom, monthDateFrom, dayNumberDateFrom] = new Date(dates.dateFrom).toDateString().split(' ');
  const [dayDateTo, monthDateTo, dayNumberDateTo] = new Date(dates.dateTo).toDateString().split(' ');

  const todayInLocalDate = new Date().toLocaleDateString();
  const slideNext = () => {
    customsSlider.current.slideNext();
  };

  const slidePrev = () => {
    customsSlider.current.slidePrev();
  };
  useEffect(() => {
    if (queryDateFrom && queryDateTo && (dates.dateFrom !== queryDateFrom || dates.dateTo !== queryDateTo)) {
      setDates({ dateFrom: queryDateFrom, dateTo: queryDateTo });
    }
  }, [queryDateFrom, queryDateTo, dates]);

  const settings = useMemo(
    () => ({
      slidesPerView: 7,
      initialSlide: calenderData?.findIndex(elm => elm.Date === todayInLocalDate) || 0,
    }),
    [calenderData, todayInLocalDate],
  );

  return (
    <div className={container}>
      <header className={calenderHeader}>
        <h1>Auction Calendar</h1>
        <div>
          <button onClick={slidePrev}>&#x3c;</button>
          <p>
            <span>{dayDateFrom} ,</span>
            <span>
              {dayNumberDateFrom} {monthDateFrom}
            </span>
            <span> - </span>
            <span>{dayDateTo} ,</span>
            <span>
              {dayNumberDateTo} {monthDateTo}
            </span>
          </p>
          <button onClick={slideNext}>&#x3e;</button>
        </div>
      </header>
      <main>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <div className={calender}>
            <Swiper
              {...settings}
              onSwiper={swiper => {
                customsSlider.current = swiper;
              }}
            >
              {calenderData.map(item => (
                <SwiperSlide key={JSON.stringify(item)} className={calenderColumn}>
                  <div>
                    <h3>
                      {item.DayName}{' '}
                      <span className={todayInLocalDate === item.Date ? activeToday : ''}>{item.DayNumber}</span>
                    </h3>
                  </div>

                  {[...Array(3)].map((event, idx) => (
                    <div className={calenderEvent} key={`${JSON.stringify(item.Events[idx])}-${idx}`}>
                      {item.Events[idx] && (
                        <>
                          <div>
                            <p>{item.Events[idx]?.Time}</p>
                            <p>{item.Events[idx]?.Title}</p>
                          </div>
                          <div>
                            <p>vehicles</p>
                            <p>{item.Events[idx]?.NumberOfItems} Item</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </main>
    </div>
  );
};
