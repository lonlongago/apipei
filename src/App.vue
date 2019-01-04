<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style type="text/css">
	body { font-size: 12px; font-family: "Microsoft YaHei", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", Tahoma, Arial, STHeiti, sans-serif; _font-family: Tahoma, Arial, Helvetica, STHeiti, sans-serif; color: #333333; font-weight:normal; font-style:normal; background-color:#eef2f5;}
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, menu, nav, output, ruby, section, summary, time, mark, audio, video, input {
	  margin: 0;
	  padding: 0;
	  border: 0;
	  font-weight: normal;
	  vertical-align: baseline;
      box-sizing: border-box;
	}
	html{margin: 0 auto; max-width: 640px; position: relative;}
	html, body,#app{height: 100%;}
	.page,body{background-color:#eef2f5;}
	p{word-wrap: break-word;/*设置强行换行*/ word-break:break-all;}

	a { color: #333; text-decoration: none; }
	ul,ol,li{ list-style: none; }
	img{ max-width:100%;vertical-align: top;}
	.none{ display:none;}
	input,button{ outline:none; appearance:none;-webkit-appearance: none;}
	textarea{outline:none;}
	.overflow_clear{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	.fl{float:left;}
	.fr{float:right;}
	.clear{ height: 0; line-height: 0; font-size: 0; clear: both;}
	.clear_both:after{content: ""; display: block; height: 0; clear: both; visibility: hidden; font-size: 0;}
	.mask_bg{ position:fixed; z-index:99; top:0; left:0; width:100%; height:100%; background:#000; opacity:0.4;}

	.maincl{ color:#fc6621;}
	.fontcl1{ color:#ff3300;}
	.fontcl2{ color:#ff6600;}
	.fontcl3{ color:#ff9900;}
	.fontcl4{ color:#FFB54C;}
	.black9{ color:#999999;}
	.black6{ color:#666666;}
	.black3{ color:#333333;}

	.border_t{ border-top:1px solid #e6e6e6;}
	.border_b{ border-bottom:1px solid #e6e6e6;}
	.border_l{ border-left:1px solid #e6e6e6;}
	.border_r{ border-right:1px solid #e6e6e6;}

	.mt5{ margin-top:5px;}
	.mt10{ margin-top:10px;}
	.mt20{ margin-top:20px;}
	.mt30{ margin-top:30px;}

	.mb5{ margin-bottom:5px;}
	.mb10{ margin-bottom:10px;}
	.mb20{ margin-bottom:20px;}
	.mb30{ margin-bottom:30px;}

	.ml5{ margin-left:5px;}
	.ml10{ margin-left:10px;}
	.ml20{ margin-left:20px;}
	.ml30{ margin-left:30px;}

	.mr5{ margin-right:5px;}
	.mr10{ margin-right:10px;}
	.mr20{ margin-right:20px;}
	.mr30{ margin-right:30px;}

	.text_c{ text-align:center;}
	.text_r{ text-align:right;}
	.text_l{ text-align:left;}

	.articleBox p a{color:#f0024f;text-decoration:underline}
	.articleBox p{margin:10px 0; font-size:14px; line-height:22px; word-break:break-all;}
	.articleBox h2{line-height:40px;}
	.articleBox img{ max-width:100%;}

	.pub_list{ position: relative; display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-align: center; -webkit-align-items: center; align-items: center; }
	.pub_list .pub_list_bd{ -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; }

	/* 按钮 */
	.btn-default-line{border:1px solid #999; color: #333; font-size: 13px; padding:0 10px; text-align: center; line-height: 26px; height: 26px; border-radius: 2px; vertical-align: middle; background:#fff;}
	.btn-primary-line{border:1px solid #f70; color: #f70; font-size: 13px; padding:0 10px; text-align: center; line-height: 26px; height: 26px; border-radius: 2px; vertical-align: middle; background:#fff;}
	.btn-primary{border:1px solid #f70; color: #fff; font-size: 13px; padding:0 10px; text-align: center; line-height: 26px; height: 26px; border-radius: 2px; vertical-align: middle; background:#f70;}
	/* 以上为重置样式 */

    #container{
        display: flex;flex-direction: column;position: relative;width: 100%;height: 100%;overflow: hidden;background-color: #fff;
    }

    /*公用提示*/
    .no_status { position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
	.no_status img { width: 90px; height: 90px; }
	.no_status p { padding-top: 20px; font-size: 16px; }
	.askpopup .popup {position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 100; width: 80%; background-color: #fff; border-radius: 10px;}
	.askpopup .popup h2{line-height: 40px; text-align: center; font-size: 20px;}
	.askpopup .popup .cont{padding: 15px 20px;}
	.askpopup .popup .tips{line-height: 20px; text-align: center; font-size: 16px;}
	.askpopup .popup .btns { display: flex; align-items: center; height: 44px; border-top:1px solid #e6e6e6;}
	.askpopup .popup .btns div {text-align: center; width: 100px;flex: 1;height: 100%;line-height: 44px; font-size: 18px;}
	.askpopup .popup .btns div.confirm{color: #328AFF;border-left: 1px solid #dedede;}
	.tipsMask{position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 100; max-width: 80%; border-radius: 5px; background: rgba(0,0,0,0.50); color: #fff; text-align: center; padding: 10px 30px; line-height: 20px; font-size: 16px;}

	/**分页加载盒子**/
	._v-container>._v-content{padding-bottom: 20px;}
	._v-container>._v-content>.loading-layer{height: 40px !important; line-height: 40px !important;}
</style>
