import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import AccessCard from "@/components/AccessCard";
import type { DataSourceAccess, Permission } from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

type AccessId = string;

interface AccessSelectionProps {
  items: DataSourceAccess[];
  onSelect: (access: DataSourceAccess) => void;
  permissions?: Permission;
  active?: AccessId;
}

const AccessSelection: FC<AccessSelectionProps> = ({
  items,
  permissions,
  onSelect,
  active,
}) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={16}
      freeMode
      modules={[FreeMode]}
      style={{ paddingLeft: 16 }}
    >
      {items.map((i) => (
        <SwiperSlide
          key={i.id}
          className={styles.sliderItem}
          style={{ width: 310 }}
        >
          <AccessCard
            {...i}
            permissions={permissions?.[i.id]}
            onClick={onSelect}
            active={i.id === active}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AccessSelection;
