export const Block =  props => 
    {
        if(!props.state.cart)
        {
            props.state.cart = []
        }
        
        return  <c-x            onClick={()=>{
          props.state.form = "bookspecs"
          props.state.book = props.book
          props.refresh()
        
        }} style={{boxShadow: "-4px 3px 28px 0px rgba(0,0,0,0.68)", 
        borderBottomRightRadius:10,borderBottomLeftRadius:10,backgroundColor:"#fff"
        , borderTopLeftRadius:10,borderTopRightRadius:10 , margin:"20px 10px"}}>
        <img
        className={global.styles.hover}
         src={props.book.imageLink}
          style={{width:200,height:200,objectFit:"fill", borderTopLeftRadius:10,borderTopRightRadius:10}}
></img>
       <f-cc style={{width:"200px",textAlign:"center",height:35,paddingTop:5 }}>
        {props.book.title}
       </f-cc>
       <f-csb style={{width:"200px",direction:"ltr",paddingLeft:5 , height:40}}>
        <c-cc>
        <del >
          {(props.book.price as number).toLocaleString("fa-IR")}
          </del>
      
          <f-13b>{((props.book.price as number)*0.8 ).toLocaleString("fa-IR")}</f-13b>

        </c-cc>
        {props.state.cart.includes(props.book.title)?null:<img src="https://cdn.turing.team/research/18/shopping-cart.png"
         style={{width:"40px",height:"40px",objectFit:"contain" ,paddingRight:10 }} ></img>}
         
       {props.state.cart.includes(props.book.title)?   <img src="https://cdn.turing.team/qepal/ok.svg" 
       style={{height:30 ,width:30 , objectFit:"fill", marginRight:10}}/>:null}
       </f-csb>

        </c-x>

    }