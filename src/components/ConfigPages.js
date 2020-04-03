import React from "react";
import { Col, Row } from "reactstrap";
import {
  ConfigMenu,
  ConfigMenuItem,
  ConfigContent,
  MiniPage,
  Control
} from "./lib/Configurator/ConfigWrapper";
import i18n from "../i18n";

const Strings = i18n();
export default function({ menuProps, currentNav, proper }) {
  return (
    <>
      <ConfigMenu>
        <ConfigMenuItem
          {...menuProps}
          link="required"
          label={Strings.RequiredMenu.MenuLabel}
          fieldsToTrackErrorsArray={[
            "DataSourceLayout",
            "PrimaryKeyField",

            "TitleField"
          ]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="lanes"
          label={Strings.LaneSetupMenu.MenuLabel}
          fieldsToTrackErrorsArray={["StatusSort", "StatusField", "SortField"]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="optional"
          label={Strings.OptionalMenu.MenuLabel}
          fieldsToTrackErrorsArray={[
            "DescriptionField",
            "LabelField",
            "AdditionalInfoField",

            "AssignedTo"
          ]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="settings"
          label={Strings.SettingsMenu.MenuLabel}
          fieldsToTrackErrorsArray={["Style", "LaneDraggable", "CardDraggable"]}
        />

        <ConfigMenuItem
          {...menuProps}
          link="filter"
          label={Strings.FilterMenu.MenuLabel}
          fieldsToTrackErrorsArray={[]}
        />
      </ConfigMenu>
      <ConfigContent>
        <MiniPage current={currentNav} name="required">
          <h4>{Strings.RequiredMenu.pageTitle}</h4>
          <Control {...proper("DataSourceLayout")}></Control>
          <Control {...proper("PrimaryKeyField")}></Control>
          <Control {...proper("TitleField")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="lanes">
          <h4>{Strings.LaneSetupMenu.pageTitle}</h4>
          <p className="text-info medium">
            {Strings.LaneSetupMenu.Instructions.laneInstrOne}
          </p>
          <p className="text-info medium">
            <strong> {Strings.LaneSetupMenu.Instructions.laneInstrTwo}</strong>
          </p>
          <p className="text-info medium">
            {Strings.LaneSetupMenu.Instructions.laneInstrThree}
          </p>

          <hr></hr>
          <Row>
            <Col>
              <p className="text-primary small">
                {Strings.LaneSetupMenu.Instructions.laneValListInstr}
              </p>
            </Col>
            <Col>
              <Control {...proper("StatusSort")}></Control>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              {" "}
              <p className="text-primary small">
                {Strings.LaneSetupMenu.Instructions.lanePlacementInstr}
              </p>
            </Col>
            <Col>
              <Control {...proper("StatusField")}></Control>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              {" "}
              <p className="text-primary small">
                {Strings.LaneSetupMenu.Instructions.laneSortInstr}
              </p>
            </Col>
            <Col>
              <Control {...proper("SortField")}></Control>
            </Col>
          </Row>
        </MiniPage>
        <MiniPage current={currentNav} name="optional">
          <h4>{Strings.OptionalMenu.pageTitle}</h4>
          <Control {...proper("DescriptionField")}></Control>
          <Control {...proper("LabelField")}></Control>
          <Control {...proper("AdditionalInfoField")}></Control>
          <Control {...proper("AssignedTo")}></Control>
          <Control {...proper("CardStyle")}></Control>
        </MiniPage>

        <MiniPage current={currentNav} name="settings">
          <h4>{Strings.SettingsMenu.pageTitle}</h4>
          <Control {...proper("Style")}></Control>
          {/* <Control {...proper("LaneDraggable")}></Control> */}
          <Control {...proper("CardDraggable")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="filter">
          <h4>{Strings.FilterMenu.pageTitle}</h4>
          <Control {...proper("FilterField")}></Control>
          <Control {...proper("QueryField")}></Control>
        </MiniPage>
      </ConfigContent>
    </>
  );
}
