import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import AccessCard from "@/components/AccessCard";
import type { DataSourceAccess } from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

type AccessId = string;

interface AccessSelectionProps {
  items: DataSourceAccess[];
  onSelect: (access: DataSourceAccess) => void;
  active?: AccessId;
}

const AccessSelection: FC<AccessSelectionProps> = ({
  items,
  onSelect,
  active,
}) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode]}
    >
      {items.map((i) => (
        <SwiperSlide key={i.id} className={styles.sliderItem}>
          <AccessCard {...i} onClick={onSelect} active={i.id === active} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AccessSelection;
