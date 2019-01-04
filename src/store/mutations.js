import * as type from './mutation_types.js'
import { getStore, setStore,removeStore} from '../api/mutils'

export default{
    [type.INIT](state) {
        state.fabu =  JSON.parse(getStore('fabu')) || {};
        state.searchv =  JSON.parse(getStore('searchv')) || {};
    },
	[type.TITLE](state,param) {
        state.fabu['title'] = param;
        setStore('fabu',state.fabu)
    },
    [type.CATEID](state,param) {
        state.fabu['cate_id'] = param;
        setStore('fabu',state.fabu)
    },
    [type.INFO_CONTENT](state,param){
        state.fabu['content'] = param;
        setStore('fabu',state.fabu)
    },
    [type.AREA_NAME](state,param){
        state.fabu['areaname'] = param.name;
        state.fabu['area_id'] = param.areaid;
        setStore('fabu',state.fabu)
    },
    [type.INPUT_TEXT](state,param){
        state.fabu['inputtext'] = param;
        setStore('fabu',state.fabu)
    },
    [type.INPUT_KEY](state,param){
        state.fabu['inputkey'] = param;
        setStore('fabu',state.fabu)
    },
    [type.CLEAR](state,param){
        state.fabu = {};
        setStore('fabu',state.fabu)
    },
    [type.CONTACT](state,param){
        state.fabu['contact'] = param;
        setStore('fabu',state.fabu)
    },
    [type.PHONEE](state,param){
        state.fabu['mobile'] = param;
        setStore('fabu',state.fabu)
    },
    [type.IMAGES](state,param){
        state.fabu['images'] = param;
        setStore('fabu',state.fabu)
    },
    [type.FILES](state,param){
        state.fabu['files'] = param;
        setStore('fabu',state.fabu)
    },
    [type.SEARCH](state,param){
        state.searchv['search'] = param;
        setStore('searchv',state.searchv)
    },
    [type.DATETIME](state,param){
        state.fabu['datetime'] = param;
        setStore('fabu',state.fabu)
    }
}