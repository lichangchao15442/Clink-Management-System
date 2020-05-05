import React, { useState, ReactText } from 'react'
import { Card, Select, Radio, Row, Col } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'
import { CloseOutlined } from '@ant-design/icons'
import { RadioChangeEvent } from 'antd/es/radio'
import { Dispatch } from 'redux'
import _ from 'loadsh'

import { prescriptionTypes } from '@/utils/dataDictionary'
import PrescriptionTable from './components/prescription-table'
import Drugs from './components/drugs'
import { CurrentPrescriptionType } from '../../data'
import styles from './index.less'

const { Option } = Select

const firstBtnId = Number(`${prescriptionTypes[0].key}1`)
const initPrescripiton = {
  id: firstBtnId,
  type: prescriptionTypes[0].key,
  name: `${prescriptionTypes[0].label}1`,
  data: []
}

interface PrescriptionProps {
  drugs: A<O>;
  dispatch: Dispatch
}

interface prescriptionType {
  id: number;
  type: number;
  name: string;
  data: A<O>;
}

const Prescription: React.FC<PrescriptionProps> = ({ drugs, dispatch }) => {
  // 所有处方的数据
  const [prescriptionArray, setPrescriptionArray] = useState<Array<prescriptionType>>([initPrescripiton])

  // 当前选中处方的ID
  const [currentPrescriptionId, setCurrentPrescriptionId] = useState(firstBtnId)

  // 当前选中的处方数据（由prescriptionArray和currentPrescriptionId决定，所以会事实更新）
  const currentPrescription = prescriptionArray.find(prescription => prescription.id === currentPrescriptionId) || initPrescripiton

  const fetchDrugs = (filters: O) => {
    dispatch({
      type: 'drugs/fetch',
      payload: filters
    })
  }

  /**
   * 在增删查处方按钮时，共同需要做的事情：
   * 1. 改变当前处方对象；
   * 2. 改变药品和药品分类
   */
  const handleBtnCommon = (current: CurrentPrescriptionType) => {
    setCurrentPrescriptionId(current.id)
    fetchDrugs({ prescriptionType: current.type })
  }

  /** 添加处方按钮时需要做的事：
   * 1. 给prescriptionArray添加一个对象，包括三个属性：
   *  type：该处方按钮的类型，由value决定；
   *  name：该处方按钮的名字，由prescriptionTypes中的该项处方按钮的label和prescriptionArray长度决定；
   *  id：该处方按钮独一无二的id，由value和当前prescriptionArray长度决定（用于决定originData）
   *  data：该处方按钮下的table的数据，数据主要是由药品模块添加的
   */
  const addPrescriptionBtn = (value: number) => {
    const name = prescriptionTypes.find(item => item.key === value)?.label

    const obj = {
      id: Number(`${value}${prescriptionArray.length + 1}`),
      type: value,
      name: `${name}${prescriptionArray.length + 1}`,
      data: []
    }

    const arr = _.cloneDeep(prescriptionArray)
    arr.push(obj)
    setPrescriptionArray(arr)
    handleBtnCommon(obj)
  }

  /** 删除处方按钮需要做的事：
   * 1. 删除prescriptionArray中的该项按钮对象
   * 注意：不再单独存放prescriptionBtns数据，而是存放prescriptionArray，
   * 这样在删除处方按钮的时候可以同时删除按钮以及按钮中table的数据
   */
  const removePrescriptionBtn = (e: any, index: number) => {
    const arr = _.cloneDeep(prescriptionArray)
    arr.splice(index, 1)
    setPrescriptionArray(arr)
    if (arr.length) {
      handleBtnCommon(arr[arr.length - 1])
    }
  }

  /** 改变处方按钮具体需要做的事：
   * 1. 使用useState改变当前处方ID
   */
  const handleChangePreBtn = (e: RadioChangeEvent) => {
    const { value } = e.target
    const current = prescriptionArray.find(item => item.id === value)
    if (current) {
      handleBtnCommon(current)
    }
  }

  // 根据条件过滤药品
  const handleFilterDrugs = (allValues: O) => {
    let obj: O = {}
    obj.prescriptionType = currentPrescription.type
    Object.keys(allValues).map(key => {
      if (key && allValues[key]) {
        if (key === 'drugName') {
          obj[key] = allValues[key].replace(/\s/g, '')
        } else {
          obj[key] = allValues[key]
        }
      }
    })
    fetchDrugs(obj)
  }

  // 添加药品
  const handleAddDrugs = (drugIdArray: ReactText[]) => {
    // 1）. 根据ID查找药品，组成添加的药品数组数据
    let addedDrugs: A<O> = []
    drugIdArray.map(id => {
      const drug = drugs.find(item => item.id === id)
      drug && addedDrugs.push(drug)
      return id
    })

    // 2）. 为不同类型的处方赋初始值
    switch (currentPrescription.type) {
      case prescriptionTypes[0].key:
        addedDrugs.forEach(item => {
          item.total = 1
          item.groupNumber = 1
        })
        break;
      case prescriptionTypes[1].key:
        addedDrugs.forEach(item => {
          item.amount = item.price
        })
        break;
      case prescriptionTypes[2].key:
        addedDrugs.forEach(item => {
          item.quantity = 1
          item.amount = item.price
        })
        break;

      default:
        break;
    }

    // 3）. 将药品添加到特定的处方中
    // ！： 深拷贝一份prescriptionArray,因为prescriptionArray中包含引用类型的值，浅拷贝可能会导致数据不渲染
    const cloneDeepPrescriptionArray = _.cloneDeep(prescriptionArray)
    cloneDeepPrescriptionArray.forEach((prescription: prescriptionType) => {
      // 找到当前处方
      if (prescription.id === currentPrescriptionId) {
        // 将药品push到data中
        // console.log('addedDrugs', ...addedDrugs)
        prescription.data.push(...addedDrugs)
      }
    })
    // 更新prescriptionArray
    setPrescriptionArray(cloneDeepPrescriptionArray)
  }

  // 删除某个处方中的某个药品
  const handleRemoveDrug = (key: number) => {
    // 根据当前处方ID找到该处方
    let newPrescriptionArray = _.cloneDeep(prescriptionArray)
    newPrescriptionArray = newPrescriptionArray.map((prescription: prescriptionType) => {
      if (prescription.id === currentPrescriptionId) {
        prescription.data.splice(key - 1, 1)
      }
      return prescription
    })
    setPrescriptionArray(newPrescriptionArray)
  }

  const PrescriptionTableProps = {
    currentPrescription,
    handleRemoveDrug
  }

  const DrugsProps = {
    dataSource: drugs,
    currentPrescription,
    handleFilterDrugs,
    handleAddDrugs
  }
  return (
    <Card
      className={styles.card}
      title={
        <div>
          <Select
            value={formatMessage({ id: 'newlyandopened.addPrescription' })}
            style={{ minWidth: 120 }}
            onChange={addPrescriptionBtn}
          >
            {prescriptionTypes.map(item =>
              <Option key={item.key} value={item.key}>{item.label}</Option>
            )}
          </Select>
          <Radio.Group buttonStyle="solid" onChange={handleChangePreBtn} value={currentPrescriptionId}>
            {prescriptionArray.map((item, index) => (
              <Radio.Button
                key={item.id}
                value={item.id}
                style={{ marginLeft: '10px' }}
              >
                {item.name}
                <CloseOutlined onClick={e => { removePrescriptionBtn(e, index) }} />
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      }
    >
      <Row gutter={16}>
        <Col lg={16} md={24} sm={24}>
          <PrescriptionTable {...PrescriptionTableProps} />
        </Col>
        <Col lg={8} md={24} sm={24}>
          <Drugs {...DrugsProps} />
        </Col>
      </Row>
    </Card>
  )
}

export default Prescription