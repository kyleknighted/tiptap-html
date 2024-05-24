import {useState} from 'react';
import TiptapMalformedHtml from "./TiptapMalformedHtml.jsx";
import TiptapDjangoLoop from "./TiptapDjangoLoop.jsx";
import './App.css';

const App = () => {
  const [view, setView] = useState('django-loop');
  return (
    <div className="App">
      <div style={{borderBottom:'1px solid #eee', padding: '8px'}}>
        <button
          onClick={() => setView('malformed-html')}
          disabled={view === 'malformed-html'}>Malformed HTML</button>
        <button
          onClick={() => setView('django-loop')}
          disabled={view === 'django-loop'}>Django Loop</button>
      </div>

      {view === 'malformed-html' && <TiptapMalformedHtml />}
      {view === 'django-loop' && <TiptapDjangoLoop />}
    </div>
  );
};

export default App;
