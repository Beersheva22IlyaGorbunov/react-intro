import React, { ReactNode, useState } from 'react';
import './App.css';
import A from './components/A';
import Input from './components/common/Input';
import Clocks from './components/Сlocks';
import InputResult from './model/common/InputResultType';

const components: Map<string, ReactNode> = new Map([
  ["clocks", <Clocks />],
  ["a", <A />]
])

const App: React.FC = () => {
  const [componentName, setComponentName] = useState<string>("");

  function submitFn(inputText: string): InputResult {
    const res: InputResult = {
      status: "error",
      message: `${inputText} doesn't exist`
    };
    if (components.has(inputText)) {
      setComponentName(inputText);
      res.status = "success";
      res.message = "";
    }
    return res;
  }

  return (
    <div>
      <Input placeholder={'Enter component name'} submitFn={submitFn} />
      {componentName && components.get(componentName)}
    </div>
  );
}

export default App;
