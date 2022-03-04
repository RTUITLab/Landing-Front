import React, { useEffect, useState } from "react";
import styles from "./Equipment.module.scss";
import { EquipmentData } from "./EquipmentData";
import dataList from "../../../data/equipment";

export default function Equipment() {
  let buff = [[]];
  JSON.parse(dataList).forEach((e: never, i: number) => {
    if (i % 8 === 0) {
      buff.push([]);
    }
    buff[Math.floor(i / 8)].push(e);
  });
  let initData: EquipmentData[][] = buff;
  const [data] = useState(initData);
  const [showMore, setShowMore] = useState(true);

  return (
    <div className={styles.parent} id={"equipment"}>
      <div className={styles.content}>
        <h1>Оборудование</h1>
        <DataMap data={data} showMore={showMore} />
      </div>
      {showMore ? (
        <button
          onClick={() => {
            setShowMore(false);
          }}
        >
          Показать еще
        </button>
      ) : null}
    </div>
  );
}

function DataMap(props: any) {
  const { data, showMore } = props;
  const [mapData, setMapData] = useState(data);

  useEffect(() => {
    if (showMore) setMapData(data.slice(0, 1));
    else setMapData(data);
  }, [data]);
  useEffect(() => {
    if (showMore) setMapData(data.slice(0, 1));
    else setMapData(data);
  }, [showMore]);

  return (
    <React.Fragment>
      {mapData.map((e: EquipmentData[], i: number) => {
        let lastelem = "false";
        if (e.length < 8) lastelem = "true";
        return (
          <div
            key={i}
            className={styles.elements}
            invert={((i + 1) % 2 === 0).toString()}
            lastelem={lastelem}
          >
            {e.map((_k: EquipmentData, j) => {
              return (
                <div
                  className={styles.element}
                  key={j}
                  style={{
                    background: `url("${_k.img}"), black`,
                  }}
                >
                  <span>{_k.name}</span>
                  <span className={styles.count}>{_k.count}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
}
