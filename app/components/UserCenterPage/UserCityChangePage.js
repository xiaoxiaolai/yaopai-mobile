import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import {History,Location} from 'react-router'
import AreaSelector from './AreaSelector'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'
import _ from 'underscore'
import areaData from '../areaData'

import WeUI from 'react-weui'
const {Button} = WeUI

class UserCityChangePage extends React.Component {
  _onUserStoreChange(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page')
    }
  }

  onSubmit() {
    let $selectList = document.querySelectorAll('.select')
    let selectResult = _.map($selectList, item => parseInt(item.value))// 得到选择的国家，省，城市 ID

    let countryData = areaData.filter(country => country.Id == selectResult[0])
    let provinceData = []
    let cityData = []

    if(selectResult[1]) {
      if(!countryData[0].Provinces[0].Cn) { // 没有省，但是有市
        console.log(1)
        if(selectResult.length > 2) console.error('错误，如有没有省，length 不可能大于 2')
        cityData = countryData[0].Provinces[0].Cities.filter(city => city.Id == selectResult[1])
      } else {
        provinceData = countryData[0].Provinces.filter(province => province.Id == selectResult[1])
      }
    }

    if(selectResult[2]) {
      cityData =  provinceData[0].Cities.filter(city => city.Id == selectResult[2])
    }

    let areaId = selectResult[selectResult.length - 1]
    let areaName = {}
    areaName.countryName = countryData[0].Cn
    
    try {
      areaName.provinceName = provinceData[0].Cn
    } catch(err) {
      areaName.provinceName = ''
    }

    try {
      areaName.cityName = cityData[0].Cn || ''
    } catch(err) {
      areaName.cityName = ''
    }

    UserActions.changeUserCity(areaId, areaName)
    this.props.history.pushState(null, '/center/user_edit_profile')
  }

  render() {
    return (
      <div className="weui_msg">
        <div className="weui_text_area">
          <h2 className="weui_msg_title">修改我的城市</h2>
        </div>

        <AreaSelector/>

        <section style={{margin: '20px 15px'}}>
          <Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
        </section>
      </div>
    )
  }
}

ReactMixin.onClass(UserCityChangePage, Reflux.listenTo(UserStore, '_onUserStoreChange'))
ReactMixin.onClass(UserCityChangePage, History)
export default UserCityChangePage
