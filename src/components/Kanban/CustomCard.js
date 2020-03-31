import React, { useState } from "react";
import { cardStyles } from "./Style/cardStyles";
import {
  cardStyleObj,
  rightContentStyleObj,
  titleContentStyleObj,
  detailContentStyleObj,
  footerContentStyleObj,
  additionalContentStyleObj,
  tagFieldStyleObj
} from "./Style/boardStyles";
import {
  CardHeader,
  CardRightContent,
  CardTitle,
  Detail,
  Footer,
  TagSpan
} from "react-trello/dist/styles/Base.js";
import "./custom.css";
function MyCard(initialProps) {
  const chosenStyle = initialProps.cardStyle;
  const thisStyle = cardStyles[chosenStyle] || {};

  const circle = { ...thisStyle.circle };
  const theCardStyle = {
    ...cardStyleObj,
    ...thisStyle.card
  };
  const theTitleStyle = {
    ...titleContentStyleObj,
    ...thisStyle.title
  };
  const theRightStyle = {
    ...rightContentStyleObj,
    ...thisStyle.label
  };
  const theDescStyle = {
    ...detailContentStyleObj,
    ...thisStyle.descrpition
  };
  const theadditionalStyle = {
    ...additionalContentStyleObj,
    ...thisStyle.additional
  };
  const theFooterStyle = {
    ...footerContentStyleObj
  };
  const theTagStyle = { ...tagFieldStyleObj };
  return (
    <div className="card" style={theCardStyle} onClick={initialProps.onClick}>
      <CardHeader>
        <CardTitle className="cardTitle" style={theTitleStyle}>
          {initialProps.title}
        </CardTitle>
        <CardRightContent className="label" style={theRightStyle}>
          {initialProps.label}
        </CardRightContent>
      </CardHeader>

      {initialProps.description && (
        <Detail style={theDescStyle}>{initialProps.description}</Detail>
      )}
      {theadditionalStyle && (
        <Detail className="additionalInfo" style={theadditionalStyle}>
          {initialProps.additional}
        </Detail>
      )}
      {
        <div className="flexButtonRowRight">
          <div className="itemBy" style={circle}>
            {initialProps.assignedTo}
          </div>
        </div>
      }
      {initialProps.tags && (
        <Footer style={theFooterStyle}>
          {initialProps.tags.map(tag => (
            <TagSpan
              style={{
                ...theTagStyle,
                backgroundColor: tag.bgcolor,
                color: tag.color
              }}
            >
              {tag.title}
            </TagSpan>
          ))}
        </Footer>
      )}
    </div>
  );
}

export default MyCard;
