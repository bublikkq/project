(function(){"use strict";var e={536:function(e,t,n){var s=n(963),r=n(252),a=n(577);const o={class:"container"},l={class:"app-title"},i=(0,r._)("p",null,"Использованы технологии: node, express, mongodb, vue",-1),c={class:"container"},u=(0,r._)("h4",{class:"section-heading"},"Поиск документа",-1),d=(0,r._)("label",{for:"search",class:"form-label"},"Поиск пользователя",-1),h={class:"mb-2"},_={class:"d-flex mb-2"},m={key:0,class:"text-success"},f=(0,r._)("b",null,"element id:",-1),p={key:1,class:"text-muted"},w=(0,r._)("span",{class:"text-danger"},"Не найдено!",-1),b=[w],v={key:0,class:"new_username"},g=(0,r._)("label",{for:"new_username",class:"form-label"},"Введите новое значение",-1),k={class:"mb-2"},y={class:"d-flex mb-2"},x={key:0,class:"text-danger"},D=(0,r._)("h4",null,"Добавление пользователя",-1),O=(0,r._)("label",{for:"search",class:"form-label"},"Добавить пользователя",-1),j={class:"mb-2"},C={class:"d-flex mb-2"},z={key:0,class:"text-muted"},q=(0,r._)("h4",{class:"section-heading"},"База данных",-1),$={key:0},U={class:"table table-dark table-striped table-hover"},P=(0,r._)("thead",null,[(0,r._)("tr",null,[(0,r._)("th",{scope:"col"},"#"),(0,r._)("th",{scope:"col"},"_id"),(0,r._)("th",{scope:"col"},"username")])],-1),V={scope:"row"},H=["onClick"];function T(e,t,n,w,T,Y){return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("header",null,[(0,r._)("div",o,[(0,r._)("h2",l,(0,a.zw)(T.title),1),i])]),(0,r._)("main",null,[(0,r._)("div",c,[(0,r._)("section",null,[(0,r._)("article",null,[u,d,(0,r._)("div",h,[(0,r._)("div",_,[(0,r.wy)((0,r._)("input",{class:"form-control",type:"text",id:"search","onUpdate:modelValue":t[0]||(t[0]=e=>T.search=e)},null,512),[[s.nr,T.search]]),(0,r._)("button",{onClick:t[1]||(t[1]=(...e)=>Y.searchOne&&Y.searchOne(...e)),class:"btn btn-primary"},"Найти")]),T.searchDoc?((0,r.wg)(),(0,r.iD)("p",m,[(0,r._)("span",null,[f,(0,r.Uk)((0,a.zw)(this.searchDoc._id),1)]),(0,r._)("a",{href:"javascript:void(0)",onClick:t[2]||(t[2]=(...e)=>Y.edit&&Y.edit(...e))},"Редактировать")])):(0,r.kq)("",!0),null==T.searchDoc&&T.search?((0,r.wg)(),(0,r.iD)("p",p,b)):(0,r.kq)("",!0)]),T.show_editer&&T.searchDoc?((0,r.wg)(),(0,r.iD)("div",v,[g,(0,r._)("div",k,[(0,r._)("div",y,[(0,r.wy)((0,r._)("input",{class:"form-control",type:"text",id:"new_username","onUpdate:modelValue":t[3]||(t[3]=e=>T.new_username=e)},null,512),[[s.nr,T.new_username]]),(0,r._)("button",{onClick:t[4]||(t[4]=(...e)=>Y.edit_username&&Y.edit_username(...e)),class:"btn btn-primary"}," Сохранить ")])]),T.err_new_username?((0,r.wg)(),(0,r.iD)("p",x,(0,a.zw)(T.err_new_username),1)):(0,r.kq)("",!0)])):(0,r.kq)("",!0)]),(0,r._)("article",null,[D,O,(0,r._)("div",j,[(0,r._)("div",C,[(0,r.wy)((0,r._)("input",{class:"form-control",type:"text",id:"search","onUpdate:modelValue":t[5]||(t[5]=e=>T.username=e)},null,512),[[s.nr,T.username]]),(0,r._)("button",{onClick:t[6]||(t[6]=(...e)=>Y.add&&Y.add(...e)),class:"btn btn-primary"},"Добавить")]),T.added?((0,r.wg)(),(0,r.iD)("p",z,(0,a.zw)(this.added),1)):(0,r.kq)("",!0)])])]),(0,r._)("section",null,[q,T.userlist?((0,r.wg)(),(0,r.iD)("div",$,[(0,r._)("table",U,[P,(0,r._)("tbody",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(T.userlist,((e,t)=>((0,r.wg)(),(0,r.iD)("tr",{key:e},[(0,r._)("td",V,(0,a.zw)(t),1),(0,r._)("td",null,(0,a.zw)(e._id),1),(0,r._)("td",null,[(0,r.Uk)((0,a.zw)(e.username)+" ",1),(0,r._)("button",{onClick:t=>Y.remove(e.username)},"Удалить",8,H)])])))),128))])])])):(0,r.kq)("",!0)])])])],64)}var Y={name:"App",data(){return{title:"Приложение для работы с БД",search:"",searchDoc:"",username:"",err_new_username:"",added:"",new_username:"",show_editer:!1,userlist:""}},created(){this.list()},methods:{list:function(){this.$axios({method:"get",url:"//localhost:3000/user/getuserlist"}).then((e=>{this.userlist=e.data})).catch((e=>{console.log(e)}))},searchOne:function(){this.$axios({method:"post",url:"//localhost:3000/user/search",data:{username:this.search}}).then((e=>{e.data?this.searchDoc=e.data:this.searchDoc=null})).catch((e=>{this.searchDoc=e}))},add:function(){this.$axios({method:"post",url:"//localhost:3000/user/add",data:{username:this.username}}).then((e=>{console.log(e),11e3==e.data.code?this.added="Duplicate key error!":this.added=this.username+" inserted",this.list()})).catch((e=>{this.added=e}))},edit:function(){this.show_editer=!0},edit_username:function(){console.log(this.searchDoc),this.$axios({method:"post",url:"//localhost:3000/user/edit_username",data:{username:this.searchDoc.username,new_username:this.new_username}}).then((e=>{if(11e3==e.data.code)return this.err_new_username=e.data.codeName;this.new_username=null,this.search=null,this.show_editer=!1,this.searchDoc=!1,this.list()}))},remove:function(e){this.$axios({method:"post",url:"//localhost:3000/user/remove",data:{id:e}}).then((()=>{this.list()})).catch((e=>{console.log(e)}))}}},A=n(744);const E=(0,A.Z)(Y,[["render",T]]);var F=E,K=n(669),M=n.n(K);const N={install:e=>{e.config.globalProperties.$axios=M()}},Z=(0,s.ri)(F);Z.use(N).mount("#app")}},t={};function n(s){var r=t[s];if(void 0!==r)return r.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,s,r,a){if(!s){var o=1/0;for(u=0;u<e.length;u++){s=e[u][0],r=e[u][1],a=e[u][2];for(var l=!0,i=0;i<s.length;i++)(!1&a||o>=a)&&Object.keys(n.O).every((function(e){return n.O[e](s[i])}))?s.splice(i--,1):(l=!1,a<o&&(o=a));if(l){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[s,r,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,s){var r,a,o=s[0],l=s[1],i=s[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(r in l)n.o(l,r)&&(n.m[r]=l[r]);if(i)var u=i(n)}for(t&&t(s);c<o.length;c++)a=o[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},s=self["webpackChunkproject"]=self["webpackChunkproject"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(536)}));s=n.O(s)})();
//# sourceMappingURL=app.450b729c.js.map