import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { url } from 'inspector';
import css from "./css.module.css";
import test from '@/pages/api/test';
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';

export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "کتاب ها"

  state.cart = Array.from(new Set(state.cart))




  let totalprice = 0;
  let c = 0;
  for(let cart of state.cart)
  {

    let book = props.books.find(b=>b.title == cart)
    if(book){totalprice +=(book.price as number)* 0.8}
    c +=1;

  }

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title='سبد خرید' style={{height:100 ,margin: 10,width: "calc(100% - 20px)"}}>
        <c-cc>
          <f-cse style={{marginTop:10 , fontSize:17}}>
            <f-cse style={{margin:10 , marginLeft:100}}>
            مجموع قابل پرداخت: {(totalprice as number).toLocaleString("fa-IR")} تومان

            </f-cse>
            <f-cse style={{margin:10 }}>
            تعداد کتاب : {(c as number).toLocaleString("fa-IR")}

            </f-cse>
          </f-cse>
        </c-cc>

      </Window>
      {state.form == "bookspecs"?<WindowFloat 
      title='مشخصات کتاب' onclose={()=>{
         delete state.form
         refresh()
      }}>
        <f-c>
          <f-15>نام کتاب: </f-15>
          <sp-2/>
          <f-15>{state.book.title}</f-15>
        </f-c>
    
        <f-c>
          <f-15>نویسنده: </f-15>
          <sp-2/>
          <f-15>{state.book.author}</f-15>
        </f-c>
        <f-c>
          <f-15>کشور: </f-15>
          <sp-2/>
          <f-15>{state.book.country}</f-15>
        </f-c>
        <f-c>
          <f-15>زبان: </f-15>
          <sp-2/>
          <f-15>{state.book.language}</f-15>
        </f-c>
        <f-c>
          <f-15>صفحات: </f-15>
          <sp-2/>
          <f-15>{(state.book.pages as number).toLocaleString("fa-IR")}</f-15>
        </f-c>
        <g-b style={{backgroundColor: "#747276"}} onClick={async()=>{
          if(!state.cart)
          {
            state.cart = []
          }
          if(state.cart.includes(state.book.title)){
            state.cart = state.cart.filter(item => item !== state.book.title)
            state.form = null
            await api("/api/testt", state.cart)
          } else {
            state.cart.push(state.book.title)
            state.form = null
     
          }
          refresh()
        }}>
          cart
        </g-b>
        </WindowFloat>:null}
      <Window title={name} style={{ minHeight: 400, margin: 10, width: "calc(100% - 20px)"}} >


        <w-cse style={{}}>
          {props.books.map(book =>{
            return <Block book = {book}
            state ={state}
            refresh={refresh}/>
          })}
        </w-cse>
           
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let books = await global.db.collection("books").find({}).toArray()

    for(let book of books){
      book.imageLink = "https://irmapserver.ir/research/ex/books/" + book.imageLink
    }
    console.log(books)
 

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}