import ReactDOM from 'react-dom/client'
import './index.css'
import { RecoilRoot } from 'recoil'
import App from './App.tsx'
import { HashRouter as Router } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <Router>
      <App/>
    </Router>
  </RecoilRoot>
    
)
