import moment from 'moment';
import $ from 'jquery';
import "./index.scss";
import "../../lib/Tablet-1.0.js";
import "../../lib/zdialog/css/style.css";
import "../../js/common.js";
import i18next from "i18next";
import apis from "../../fetch/index.js";

// console.log(i18next.t('key'))
document.getElementById('signatureTitle').innerText = i18next.t('signTitle');
document.getElementById('signatureContent').innerText = i18next.t('signContent');
document.getElementById('save').innerText = i18next.t('save');
document.getElementById('reset').innerText = i18next.t('reset');
document.getElementById("footer").innerText = i18next.t('footer');
document.getElementById('submitToChain').innerText = i18next.t('submitToChain');
// document.getElementById('template').innerHTML = template;

const signId = getQueryString("id");

$(document).ready(async function() {
	// 从后台获取模板数据
	const templateRes = await apis.getTemplate({
		id: signId
	});
	if (templateRes && templateRes.code === 0) {
		console.log(templateRes.data.fileCode)
		document.getElementById('template').innerHTML = templateRes.data.fileCode;
	}
	// 先获取到需要签名的地方，然后遍历其签名的地方
	const signButton = $('.signButton');
	for(let i = 0; i < signButton.length; i += 1) {
		const signButtonDom = signButton[i];
		$('#' + signButtonDom.id).bind('click', function(e) {
			// console.log(signButtonDom.id)
			$('#notifyPop').show();
			var tablet;
			$(function (){
				tablet = new Tablet("#popContent",{
					defaultColor: "#2e76da",
					// width: $("#notifyPop").width() - 150,
					// height: $("#notifyPop").height() - 100,
					titleHtml: $("#signTitle").html(),
					otherHtml: $("#signTools").html(),
					onInit: function (){
						var that = this,
						container = this.container;
						that.rotate(90)
						// container.find("select").eq(0).on("change", function (){
						// 	that.setLineWidth($(this).val());
						// });
						// container.find("select").eq(1).on("change", function (){
						// 	that.rotate($(this).val());
						// });
						container.find("#save").on("click", async function (){
							const base64 = that.getBase64();
							// 调用后台的接口
							let res = await apis.saveSign({
								signId,
								file: base64,
								type: 0
							});
							if (res && res.code === 0) {
								writeImg(signButtonDom.id, base64)
							} else {
								jqtoast('当前请求失败，请检查网络是否通畅！')
							}
							that.clear();
							$("#popContent").html("");
							$('#notifyPop').hide();
							// if(await saveBase64(base64)) {
							// 	// 清空画布
							// 	writeImg(signButtonDom.id, base64)
							// 	that.clear();
							// 	$("#popContent").html("");
							// 	$('#notifyPop').hide();
							// }
							// if(!that.isMobile){
							// 	alert("请按f12打开控制台查看base64图片数据！");
							// }
						});
						container.find('#closeImg').on("click", function () {
							// 清空画布
							that.clear();
							$("#popContent").html("");
							$('#notifyPop').hide();
						})
						// container.find(".get_blob").on("click", function (){
						// 	that.getBlob();
						// });
						/*container.find(".download").on("click", function (){
							document.getElementById("preview_img").src = that.getBase64();
						});*/
					}
				});
			});  
		})
	}
	function writeImg(id, base64) {
		// 获取图片的id
		var date = new Date();
		$("#" + id + "_img").attr('src', base64);
		$("#" + id + "_img").css('display', 'inline-block')
		$("#" + id + "_dateval").text(moment(date.getTime()).format('YYYY-MM-DD HH:mm:ss'))
		$("#" + id + "_date").css('display', 'inline-block')
		$("#" + id).hide()
		// 将提交签名上链按钮显示出来
		$("#submitToChain").css('display', 'block');
		$("#waitSign").css('display', "none");
	}
	$("#submitToChain").bind("click", async function() {
		const res = await apis.saveDataToBlockChain({
			signId: signId
		});
		if (res && res.code === 0) {
			window.location.href = '/showConsent.html';
		} else {
			jqtoast(res.msg)
		}
		
	})
		
})

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 




/*alert弹出层*/
function jqalert(param) {
    var title = param.title,
        content = param.content,
        yestext = param.yestext,
        notext = param.notext,
        yesfn = param.yesfn,
        nofn = param.nofn,
        nolink = param.nolink,
        yeslink = param.yeslink,
        prompt = param.prompt,
        click_bg = param.click_bg;

    if (click_bg === undefined){
        click_bg = true;
    }
    if (yestext === undefined){
        yestext = '确认';
    }
    if (!nolink){
        nolink = 'javascript:void(0);';
    }
    if (!yeslink){
        yeslink = 'javascript:void(0);';
    }

    var htm = '';
    htm +='<div class="jq-alert" id="jq-alert"><div class="alert">';
    if(title) htm+='<h2 class="title">'+title+'</h2>';
    if (prompt){
        htm += '<div class="content"><div class="prompt">';
        htm += '<p class="prompt-content">'+prompt+'</p>';
        htm += '<input type="text" class="prompt-text"></div>';
        htm +='</div>';
    }else {
        htm+='<div class="content">'+content+'</div>';
    }
    if (!notext){
        htm+='<div class="fd-btn"><a href="'+yeslink+'" class="confirm" id="yes_btn">'+yestext+'</a></div>'
        htm+='</div>';
    }else {
        htm+='<div class="fd-btn">'+
            '<a href="'+nolink+'"  data-role="cancel" class="cancel">'+notext+'</a>'+
            '<a href="'+yeslink+'" class="confirm"  id="yes_btn">'+yestext+'</a>'+
            '</div>';
        htm+='</div>';
    }
    $('body').append(htm);
    var al = $('#jq-alert');
    al.on('click','[data-role="cancel"]',function () {
        al.remove();
        if (nofn){
            param.nofn();
            nofn = '';
        }
        param = {};
    });
    $(document).delegate('.alert','click',function (event) {
        event.stopPropagation();
    });
    $(document).delegate('#yes_btn','click',function () {
        setTimeout(function () {
            al.remove();
        },300);
        if (yesfn){
            param.yesfn();
            yesfn ='';
        }
        param = {};
    });
    if(click_bg === true){
        $(document).delegate('#jq-alert','click',function () {
            setTimeout(function () {
                al.remove();
            },300);
            yesfn ='';
            nofn = '';
            param = {};
        });
    }

}
/*toast 弹出提示*/
function jqtoast(text,sec) {
    var _this = text;
    var this_sec = sec;
    var htm = '';
    htm += '<div class="jq-toast" style="display: none;">';
    if (_this){
        htm +='<div class="toast">'+_this+'</div></div>';
        $('body').append(htm);
        $('.jq-toast').fadeIn();

    }else {
        jqalert({
            title:'提示',
            content:'提示文字不能为空',
            yestext:'确定'
        })
    }
    if (!sec){
        this_sec = 2000;
    }
    setTimeout(function () {
        $('.jq-toast').fadeOut(function () {
            $(this).remove();
        });
        _this = '';
    },this_sec);
}



