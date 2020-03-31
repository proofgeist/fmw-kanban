import React from "react";
import { Col, Row } from "reactstrap";
import {
  ConfigMenu,
  ConfigMenuItem,
  ConfigContent,
  MiniPage,
  Control
} from "./lib/Configuration";
import otherText from "..//../src/otherText_en.json";
import defaultConfig from "..//../src/configuration.json";
const laneSetup = otherText.LaneSetupMenu.Fields;
console.log("laneSetup", laneSetup);

export default function({ menuProps, currentNav, proper }) {
  return (
    <>
      <ConfigMenu>
        <ConfigMenuItem
          {...menuProps}
          link="required"
          label={"Required"}
          fieldsToTrackErrorsArray={[
            "DataSourceLayout",
            "PrimaryKeyField",

            "TitleField"
          ]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="lanes"
          label="Lane Setup"
          fieldsToTrackErrorsArray={["StatusSort", "StatusField", "SortField"]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="optional"
          label="Optional"
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
          label="Settings"
          fieldsToTrackErrorsArray={["Style", "LaneDraggable", "CardDraggable"]}
        />

        <ConfigMenuItem
          {...menuProps}
          link="filter"
          label="Filter"
          fieldsToTrackErrorsArray={[]}
        />
      </ConfigMenu>
      <ConfigContent>
        <MiniPage current={currentNav} name="required">
          <h4>{otherText.RequiredMenu.pageTitle}</h4>
          <Control {...proper("DataSourceLayout")}></Control>
          <Control {...proper("PrimaryKeyField")}></Control>
          <Control {...proper("TitleField")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="lanes">
          <h4>Lane Setup</h4>
          <p className="text-info medium">
            A Kanban board consists of lanes and cards. Each lane is a unique
            value in a field in the source table. Lanes can come from many
            different fields: status, assignee, month, etc.
          </p>
          <p className="text-info medium">
            <strong>Each card is a record that belongs in that lane.</strong>
          </p>
          <p className="text-info medium">
            Choose a value list, a field that will sort cards into lanes, and a
            field by which the cards will be sorted.
          </p>

          <hr></hr>
          <Row>
            <Col>
              <p className="text-primary small">
                The value list defines the lanes, and the order of the values in
                that list determines the lanes' order. The value list can be
                hard coded or come from a field in a table.
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
                The 'Lane Placement Field' determines into which lane each card
                is placed. Use the field that corresponds to the chosen value
                list.
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
                Pick the field by which the cards in the lanes will be sorted.
                You can have multiple sorts in a table, one for each way you
                wish to define the lanes.
              </p>
            </Col>
            <Col>
              <Control {...proper("SortField")}></Control>
            </Col>
          </Row>
        </MiniPage>
        <MiniPage current={currentNav} name="optional">
          <h4>Optional Fields</h4>
          <Control {...proper("DescriptionField")}></Control>
          <Control {...proper("LabelField")}></Control>
          <Control {...proper("AdditionalInfoField")}></Control>
          <Control {...proper("AssignedTo")}></Control>
          <Control {...proper("CardStyle")}></Control>
        </MiniPage>

        <MiniPage current={currentNav} name="settings">
          <h4>Settings</h4>
          <Control {...proper("Style")}></Control>
          {/* <Control {...proper("LaneDraggable")}></Control> */}
          <Control {...proper("CardDraggable")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="filter">
          <h4>Filter</h4>
          <Control {...proper("FilterField")}></Control>
          <Control {...proper("QueryField")}></Control>
        </MiniPage>
      </ConfigContent>
    </>
  );
}
