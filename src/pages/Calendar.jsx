import React, { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent, DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import axios from 'axios';

// import { scheduleData } from '../data/dummy';
// import { Header } from '../components';

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Calendar = () => {
  const [scheduleObj, setScheduleObj] = useState();
  const [scheduleData, setScheduleData] = useState([])

  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://ltquiambao-fluffy-space-waddle-7ppjg6jvxj63q57-8080.preview.app.github.dev/api/v1/schedule");
      console.log(data)
      setScheduleData(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  const onClickButton = () => {
    let cellData = {
    };
    scheduleObj.openEditor(cellData, 'Add');
  }

  const onActionComplete = (args) => {
    console.log(args);
    if (args.requestType === 'toolBarItemRendered') {
      // This block is execute after toolbarItem render
    }
    if (args.requestType === 'dateNavigate') {
      // This block is executed after previous and next navigation
    }
    if (args.requestType === 'viewNavigate') {
      // This block is execute after view navigation
    }
    if (args.requestType === 'eventCreated') {
      // This block is execute after an appointment create

    }
    if (args.requestType === 'eventChanged') {
      // This block is execute after an appointment change
    }
    if (args.requestType === 'eventRemoved') {
      // This block is execute after an appointment remove
    }
  }

  const editorTemplate = (props) => {
    return (props !== undefined ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
      <tr><td className="e-textlabel">Summary</td><td colSpan={4}>
        <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
      </td></tr>
      <tr><td className="e-textlabel">Status</td><td colSpan={4}>
        <DropDownListComponent id="EventType" placeholder='Choose status' data-name="EventType" className="e-field" style={{ width: '100%' }} dataSource={['New', 'Requested', 'Confirmed']} value={props.EventType || null}></DropDownListComponent>
      </td></tr>
      <tr><td className="e-textlabel">From</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">To</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">Reason</td><td colSpan={4}>
        <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
      </td></tr></tbody></table> : <div></div>);
  }

  return (
    <div className="m-2 md:m-10 mt-24 md:mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* <Header category="App" title="Calendar" /> */}
      <button className="m-2 p-2 rounded-full bg-white hover:bg-light-gray" type="button" onClick={onClickButton}>Add task</button>
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date()}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
        editorTemplate={editorTemplate}
        actionComplete={onActionComplete}
      >
        <ViewsDirective>
          {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={new Date(2021, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Calendar;