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
const Page: PageEl = (props, state:
  {
    form: string,
    book: {
      title: string, author: string, country: string,
      imageLink: string, price: number,
      language: string, pages: number,
    },
    cart: Array<string>
  }, refresh, getProps) => {

  let styles = global.styles
  let name = "کتاب ها"



  if (!state.cart) {
    state.cart = props.cart.map(o => o.title)
  }


  let totalprice = 0;
  let c = 0;
  for(let title of state.cart)
  {

    let book = props.books.find(b=>b.title == title)
    if(book){totalprice +=(book.price as number)* 0.8}
    c +=1;

  }

  console.log(props.cart)

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
       
          if(state.cart.includes(state.book.title)){
            state.cart = state.cart.filter(item => item !== state.book.title)
            state.form = null
            refresh()
          } else {
            state.cart.push(state.book.title)
            state.form = null
            refresh()
          }
          await api("/api/testt", state.cart)
          
        }}>
          {state.cart.includes(state.book.title) ? <f-13>remove</f-13> : <f-13>cart</f-13>}
        </g-b>
        </WindowFloat>:null}
      <Window title={name} style={{ minHeight: 400, margin: 10, width: "calc(100% - 20px)"}} >


        <w-cse style={{}}>
          {props.books.map(book =>{
            return <Block 
            book = {book}
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
    let cart = await global.db.collection("cart").find({}).toArray()
    for(let book of books){
      book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
    }
    console.log(books)
 

    console.log(cart)
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        cart,
        // nlangs,
      })
    },
  }
}