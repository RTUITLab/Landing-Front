import AchievementPageTemplate, {
  Content,
  GalleryProp, Head
} from "../../modules/AchievementPageTemplate/AchievementPageTemplate";
import React from "react";


export default function CP() {

  return (
    <AchievementPageTemplate title={"title"} coverLink={"f"} desc={"Описание"}>
      <Head>
        <h1>Цифровой прорыв</h1>
        <p>Какой-то текст</p>
      </Head>
      <Content>
        <div>
          <GalleryProp>
            <div><img src="/images/sss.webp" alt=""/></div>
            <div><img src="/images/sss.webp" alt=""/></div>
            <div><img src="/images/sss.webp" alt=""/></div>
            <div><img src="/images/sss.webp" alt=""/></div>
            <div><img src="/images/sss.webp" alt=""/></div>
            <div><img src="/images/sss.webp" alt=""/></div>
          </GalleryProp>
        </div>
        <div>
          <h2>О событии</h2>
          <p>
            Сегодня завершился четвёртый тематический 48-часовой хакатон «Креативные индустрии, коммуникации и контент»
            Цифрового Прорыва 2021. Как вы уже догадались, мы и в этот раз не остались в стороне!
          </p>
          <p>
            Из 105 решений команд по 8 трекам команда RealityGuys взяла первое место в треке от Ростелекома и 250 000
            рублей! Ребята выбрали кейс "Графический редактор для Дизайн-системы РТК". Нужно было создать
            интуитивно-понятный инструмент, в котором соблюдаются все правила дизайн-системы компании, и команда успешно с
            этим справилась!
          </p>
          <p><strong>Дата проведения: </strong>12.12.2012</p>
        </div>
      </Content>
    </AchievementPageTemplate>
  )
}
