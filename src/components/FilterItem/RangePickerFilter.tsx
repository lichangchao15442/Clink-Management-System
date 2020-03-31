import React from 'react'
import { Form, DatePicker } from 'antd'
import moment from 'moment'
import { formatMessage } from 'umi-plugin-react/locale'
import styles from './index.less'

const FormItem = Form.Item
const { RangePicker } = DatePicker

const ranges = {}
ranges[formatMessage({ id: 'commonandfields.today' })] = [moment(), moment()]
ranges[formatMessage({ id: 'commonandfields.yesterday' })] = [moment().subtract(1, 'days'), moment().subtract(1, 'days')]
ranges[formatMessage({ id: 'commonandfields.nearlyThreeDays' })] = [moment().subtract(2, 'days'), moment()]
ranges[formatMessage({ id: 'commonandfields.nearlyAWeek' })] = [moment().subtract(1, 'weeks'), moment()]
ranges[formatMessage({ id: 'commonandfields.lastTwoWeeks' })] = [moment().subtract(2, 'weeks'), moment()]
ranges[formatMessage({ id: 'commonandfields.nearlyThreeWeeks' })] = [moment().subtract(3, 'weeks'), moment()]
ranges[formatMessage({ id: 'commonandfields.lastMonth' })] = [moment().subtract(1, 'months'), moment()]
ranges[formatMessage({ id: 'commonandfields.nearlyTwoMonths' })] = [moment().subtract(2, 'months'), moment()]


interface RangePickerFilterProps {
    name: string;
    label: string;
    onChange: (dates: any, dateString: [string, string]) => void;
}

const RangePickerFilter: React.FC<RangePickerFilterProps> = ({ name, label, onChange }) => (
    <FormItem name={name} label={label} className={styles.rangePick}>
        <RangePicker
            style={{ width: 220 }}
            ranges={ranges}
            onChange={onChange}
        />
    </FormItem>
)

export default RangePickerFilter