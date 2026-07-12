import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseAbsoluteToLocal } from "@internationalized/date";
import moment from "moment";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  FieldError,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";


const MyDatePicker = ({ label, error, disabled, ...props }) => {

  return (
    <>
      <DatePicker
        granularity="day"
        isDisabled={disabled}
        // maxValue={parseAbsoluteToLocal(moment().format())}
        {...props}
      >
        <Label>{label}</Label>
        <Group>
          <DateInput>
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          <Button>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Button>
        </Group>
        <FieldError>{error}</FieldError>
        <Popover>
          <Dialog>
            <Calendar>
              <header>
                <Heading />
                <Button slot="previous">◀</Button>
                <Button slot="next">▶</Button>
              </header>
              <CalendarGrid>
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell>
                      {day}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(d) => (
                    <CalendarCell date={d} />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DatePicker>
    </>
  );
};

export default MyDatePicker;
