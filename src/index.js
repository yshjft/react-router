import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch, Link, NavLink, useParams} from 'react-router-dom';
import './index.css';

function Home(){
  return(
    <div>
      <h2>Home</h2>
      Home....
    </div>
  )
}

var contents=[
  {id:1, title:'HTML', description : 'HTML is ....'},
  {id:2, title:'JS', description : 'JS is ....'},
  {id:3, title:'React', description : 'React is ....'},
];

function Topic(){
  //useParams hook 사용
  var params=useParams();
  var topic_id=params.topic_id;
  var selected_topic={
    title :'Sorry',
    description: 'Not Found',
  };

  for(var i=0; i<contents.length; i++){
    if(contents[i].id === Number(topic_id)){
      selected_topic.title=contents[i].title;
      selected_topic.description=contents[i].description;
      break;
    }
  }

  return(
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}

function Topics(){
  var list =[];
  for(var i=0; i<contents.length; i++){
  list.push(<li key={contents[i].id}><NavLink to={'/topics/'+contents[i].id}>{contents[i].title}</NavLink></li>);
  }
  return(
    <div>
      <h2>Topics</h2>
      {/* nested routing : router안에 router가 중첩된 사례 */}
      <ul>
        {list}
      </ul>
      <Route path='/topics/:topic_id'>
        <Topic></Topic>
      </Route>
    </div>
  )
}

function Contact(){
  return(
    <div>
      <h2>Contact</h2>
      Contact....
    </div>
  )
}

function App(){
  return (
    <div>
      <h1>React Router DOM example</h1>
      <ul>
        {/* Link : routing을 reload 없이 처리하는 기능
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/contact">Contact</Link></li> 
        */}

        {/*NavLink : Link와 기능이 유사하지만 선택을 할 경우 active라는 class가 생긴다*/}
        {/*NavLink : 클릭할 때마다 사용자가 어떤 것을 선택했는지 추적할 수 있다*/}
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink exact to="/topics">Topics</NavLink></li>
        <li><NavLink exact to="/contact">Contact</NavLink></li>

      </ul>
      {/*Switch : path와 일치하는 첫번째 컴포넌트가 발견되면 나머지 컴포넌트는 버린다*/}
      <Switch>
        {/*exact : 정확히 path와 일치할 경우에 route한다. */}
        <Route exact path="/"><Home></Home></Route> 
        <Route path="/topics"><Topics></Topics></Route>
        <Route path="/contact"><Contact></Contact></Route>
        <Route path="/">Not Found</Route>
      </Switch>
    </div>
  );
}

ReactDOM.render( 
  <React.StrictMode>
    {/*BrowserRouter는 react-router-dom을 적용하고 싶은 컴포넌트에 최상위 컴포넌트를 감싸준다*/}
    {/*App이라는 컴포넌트 안에서는 BrouserRouter를 사용할 수 있게 되었다. */}
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
