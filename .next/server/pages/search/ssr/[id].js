(()=>{var e={};e.id=786,e.ids=[786,888,660],e.modules={7454:e=>{e.exports={info:"Info_info__CPqkF",card:"Info_card___aZbw","character-img":"Info_character-img__WcwVY",stats:"Info_stats__IuVOG",stat:"Info_stat__qWobk"}},8624:e=>{e.exports={root:"Layout_root__16pzl",container:"Layout_container__r7utL",card:"Layout_card__1Vp29","info-from-store":"Layout_info-from-store__Opl4n"}},7409:e=>{e.exports={loader:"Loader_loader__aTh_8",rotation:"Loader_rotation__iM4O0"}},3584:e=>{e.exports={form:"Searching_form__cY8zU","search-input":"Searching_search-input__8uFm4","search-button":"Searching_search-button__jE4kf"}},3540:(e,t,r)=>{"use strict";r.r(t),r.d(t,{config:()=>f,default:()=>g,getServerSideProps:()=>y,getStaticPaths:()=>m,getStaticProps:()=>x,reportWebVitals:()=>_,routeModule:()=>q,unstable_getServerProps:()=>S,unstable_getServerSideProps:()=>b,unstable_getStaticParams:()=>j,unstable_getStaticPaths:()=>P,unstable_getStaticProps:()=>v});var a={};r.r(a),r.d(a,{default:()=>h,getServerSideProps:()=>p});var s=r(7093),i=r(5244),c=r(1323),o=r(5211),n=r(888),d=r(4978),l=r(3372),u=r(993);let h=u.Z,p=l.Y.getServerSideProps(e=>async t=>{let r=t.query.id||"1",{data:a}=await e.dispatch(d.Xz.initiate(+r));return await Promise.all(e.dispatch((0,d.zk)())),{props:{data:a}}}),g=(0,c.l)(a,"default"),x=(0,c.l)(a,"getStaticProps"),m=(0,c.l)(a,"getStaticPaths"),y=(0,c.l)(a,"getServerSideProps"),f=(0,c.l)(a,"config"),_=(0,c.l)(a,"reportWebVitals"),v=(0,c.l)(a,"unstable_getStaticProps"),P=(0,c.l)(a,"unstable_getStaticPaths"),j=(0,c.l)(a,"unstable_getStaticParams"),S=(0,c.l)(a,"unstable_getServerProps"),b=(0,c.l)(a,"unstable_getServerSideProps"),q=new s.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/search/ssr/[id]",pathname:"/search/ssr/[id]",bundlePath:"",filename:""},components:{App:n.default,Document:o.default},userland:a})},8190:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var a=r(997);r(6689);let s=e=>a.jsx("button",{"data-testid":e.dataTestid,className:`button ${e.style}`,onClick:e.onClick,children:e.children})},993:(e,t,r)=>{"use strict";r.d(t,{Z:()=>m});var a=r(997),s=r(6689),i=r(7454),c=r.n(i),o=r(7897),n=r(8190),d=r(4978),l=r(6022),u=r(1841),h=r(1163),p=r(1171),g=r(5675),x=r.n(g);let m=({details:e})=>{let t=(0,p.C)(e=>e.data.searchValue),r=t&&"string"==typeof t?encodeURI(t):"",i=(0,l.useDispatch)(),g=(0,h.useRouter)(),m=(0,p.C)(e=>e.data.countPerPage),y=g.query?.id||0,f=(0,p.C)(e=>e.data.page),{isLoading:_}=(0,d.P3)(+y,{skip:!1==!!y});return(0,s.useEffect)(()=>{i((0,u.ch)(_))},[i,_]),_?a.jsx(o.Z,{}):a.jsx("div",{className:c().info,"data-testid":"info",children:(0,a.jsxs)("div",{className:c().card,children:[a.jsx(n.Z,{style:"close-button",dataTestid:"close-button",onClick:()=>{g.push(`/search/?page=${f}&count=${m}${t&&`&searchValue=${r}`}`)},children:"X"}),a.jsx("h2",{children:"Info about: "}),a.jsx("h3",{children:e?.name}),a.jsx(x(),{priority:!0,width:500,height:500,"data-testid":"info-img",className:c()["character-img"],src:e?.image?e.image:"",alt:"info-img"}),(0,a.jsxs)("div",{className:c().stats,children:[(0,a.jsxs)("li",{"data-testid":"species",children:[" species: ",e?.species]}),(0,a.jsxs)("li",{"data-testid":"gender",children:[" gender: ",e?.gender]}),(0,a.jsxs)("li",{"data-testid":"status",children:[" status: ",e?.status]}),(0,a.jsxs)("li",{"data-testid":"location",children:[" location: ",e?.location.name]}),(0,a.jsxs)("li",{"data-testid":"type",children:[" type: ",e?.type]}),(0,a.jsxs)("li",{"data-testid":"created",children:[" created: ",e?.created]})]})]})})}},7897:(e,t,r)=>{"use strict";r.d(t,{Z:()=>c});var a=r(997);r(6689);var s=r(7409),i=r.n(s);let c=()=>a.jsx("div",{className:i().loader,"data-testid":"loader"})},4978:(e,t,r)=>{"use strict";r.d(t,{P3:()=>d,UY:()=>c,Xz:()=>u,ZO:()=>h,pb:()=>n,q4:()=>o,sw:()=>p,zk:()=>l});var a=r(4335),s=r(2781),i=r(5648);let c=(0,a.createApi)({reducerPath:"rickAndMorty",baseQuery:(0,a.fetchBaseQuery)({baseUrl:s._n}),extractRehydrationInfo(e,{reducerPath:t}){if(e.type===i.HYDRATE)return e.payload[t]},endpoints:e=>({fetchDataByPage:e.query({query:e=>`/character/?page=${e}`}),fetchDataByValue:e.query({query:e=>"searchValue"===e.type?`/character/?name=${e.value}`:"changePage"===e.type?`/character/?page=${e.value}`:"/character/"}),fetchRickandmortyDetails:e.query({query:e=>`/character/${e}`})})}),{useFetchDataByPageQuery:o,useFetchDataByValueQuery:n,useFetchRickandmortyDetailsQuery:d,util:{getRunningQueriesThunk:l}}=c,{fetchRickandmortyDetails:u,fetchDataByPage:h,fetchDataByValue:p}=c.endpoints},2781:(e,t,r)=>{"use strict";r.d(t,{XJ:()=>i,_n:()=>a,yD:()=>s});let a="https://rickandmortyapi.com/api/",s="20",i=1},888:(e,t,r)=>{"use strict";r.r(t),r.d(t,{App:()=>v,default:()=>j});var a=r(997);r(108);var s=r(6689),i=r.n(s),c=r(8190);class o extends i().Component{constructor(e){super(e),this.state={hasError:!1},this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error("ErrorBoundary Uncaught error:",e,t)}reload(){}render(){return this.state.hasError?(0,a.jsxs)(a.Fragment,{children:[a.jsx("h1",{children:"Sorry.. there was an error"}),a.jsx(c.Z,{onClick:this.reload,children:"Reload"})]}):this.props.children}}var n=r(3584),d=r.n(n),l=r(2781),u=r(6022),h=r(1841),p=r(1171),g=r(1163);let x=()=>{let e=(0,u.useDispatch)(),t=(0,g.useRouter)(),[r,c]=(0,s.useState)(""),o=(0,p.C)(e=>e.data.query),n=(0,p.C)(e=>e.data.countPerPage)||l.yD,x=i().createRef(),m=i().createRef();return(0,s.useEffect)(()=>{let t=localStorage.getItem("searchValue");t&&(c(t),e((0,h.gI)(t))),"changePage"===o.type&&(c(""),localStorage.setItem("searchValue",""),e((0,h.gI)("")))},[e,o.type]),(0,a.jsxs)(a.Fragment,{children:[a.jsx("h2",{children:"Rick and Morty"}),a.jsx("section",{className:d()["character-searching"],children:(0,a.jsxs)("form",{className:d().form,children:[a.jsx("input",{ref:x,className:d()["search-input"],type:"text",placeholder:"search...",value:r,onChange:function(t){t?.target instanceof HTMLInputElement&&(function(e){if(!0!==/^\s|\s$/.test(e.value))return e.setCustomValidity(""),m.current?.classList.remove("disable");e.setCustomValidity("Searching must not contain leading or trailing whitespace."),m.current?.classList.add("disable"),e.reportValidity()}(t?.target),c(t?.target.value),e((0,h.gI)(t?.target.value)))}}),a.jsx("div",{"data-testid":"search-button",className:d()["search-button"],onClick:function(){localStorage.setItem("searchValue",r),e((0,h.gI)(r)),t.push(`/search/?page=1&count=${n}&searchValue=${r}`),e((0,h._L)({type:"searchValue",value:r}))},ref:m})]})})]})};var m=r(8624),y=r.n(m);let f=({children:e})=>{let t=(0,p.C)(e=>e.data.searchValue),r=(0,p.C)(e=>e.data.countPerPage),s=(0,p.C)(e=>e.data.viewMode);return(0,a.jsxs)("div",{className:"container",children:[a.jsx(x,{}),(0,a.jsxs)("div",{className:y()["info-from-store"],children:[(0,a.jsxs)("h4",{children:["SearchValue: ",t||"Empty"]}),(0,a.jsxs)("h4",{children:["CountPerPage: ",r||"Empty"]}),(0,a.jsxs)("h4",{children:["ViewMode: ",`${s}`||"Empty"]})]}),e]})};var _=r(3372);function v({Component:e,pageProps:t}){return a.jsx(o,{children:a.jsx(f,{children:a.jsx(e,{...t})})})}let P=_.Y.withRedux(v),j=P},5211:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Document});var a=r(997),s=r(6859);function Document(){return(0,a.jsxs)(s.Html,{lang:"en",children:[a.jsx(s.Head,{}),(0,a.jsxs)("body",{children:[a.jsx(s.Main,{}),a.jsx(s.NextScript,{})]})]})}},1841:(e,t,r)=>{"use strict";r.d(t,{Nd:()=>n,YA:()=>h,ZP:()=>m,_L:()=>x,ch:()=>d,eY:()=>o,gI:()=>g,hm:()=>l,sV:()=>p});var a=r(5184),s=r(2781);let i={init:!0,data:[],mainIsLoading:!1,detailesIsLoading:!1,page:s.XJ,countPerPage:s.yD,searchValue:"",viewMode:!1,query:{type:"searchValue",value:""}},c=(0,a.createSlice)({name:"app",initialState:i,reducers:{setInit:(e,t)=>{e.init=t.payload},setQuery:(e,t)=>{e.query=t.payload},setMainIsLoading:(e,t)=>{e.mainIsLoading=t.payload},setDetailesIsLoading:(e,t)=>{e.detailesIsLoading=t.payload},setViewMode:(e,t)=>{e.viewMode=t.payload},setData:(e,t)=>{e.data=t.payload},setPage:(e,t)=>{e.page=t.payload},setCountPerPage:(e,t)=>{e.countPerPage=t.payload},setSearchValue:(e,t)=>{e.searchValue=t.payload}}}),{setInit:o,setMainIsLoading:n,setDetailesIsLoading:d,setViewMode:l,setData:u,setPage:h,setCountPerPage:p,setSearchValue:g,setQuery:x}=c.actions,m=c.reducer},1171:(e,t,r)=>{"use strict";r.d(t,{C:()=>s});var a=r(6022);let s=a.useSelector},3372:(e,t,r)=>{"use strict";r.d(t,{Y:()=>l});var a=r(5184),s=r(1841),i=r(5642),c=r(4978),o=r(5648);let n=()=>(0,a.configureStore)({reducer:{data:s.ZP,[c.UY.reducerPath]:c.UY.reducer},middleware:e=>e().concat(c.UY.middleware),devTools:!1}),d=n();(0,i.setupListeners)(d.dispatch);let l=(0,o.createWrapper)(n)},108:()=>{},5184:e=>{"use strict";e.exports=require("@reduxjs/toolkit")},5642:e=>{"use strict";e.exports=require("@reduxjs/toolkit/query")},4335:e=>{"use strict";e.exports=require("@reduxjs/toolkit/query/react")},5648:e=>{"use strict";e.exports=require("next-redux-wrapper")},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},6405:e=>{"use strict";e.exports=require("react-dom")},6022:e=>{"use strict";e.exports=require("react-redux")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},7147:e=>{"use strict";e.exports=require("fs")},1017:e=>{"use strict";e.exports=require("path")},9955:e=>{"use strict";e.exports=require("stream")},9796:e=>{"use strict";e.exports=require("zlib")}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[428,163,859,584],()=>r(3540));module.exports=a})();