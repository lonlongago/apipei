export default{
	title : ({commit} , param) => commit('TITLE',param),
	info_content : ({commit} , param) => commit('INFO_CONTENT',param),
	input_text : ({commit} , param) => commit('INPUT_TEXT',param),
	input_key : ({commit} , param) => commit('INPUT_KEY',param),
	area_name : ({commit} , param) => commit('AREA_NAME',param),
	init : ({commit} , param) => commit('INIT',param),
}