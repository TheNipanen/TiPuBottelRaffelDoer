import React, { useEffect, useState } from 'react'

function Raffel(props) {
  const names = props.names
  const setNames = props.setNames
  const [shuffledNames, setShuffledNames] = useState([])
  const [judgements, setJudgements] = useState([])

  const judge = () => {
    const j = []
    for (let i = 0; i < names.length; i++) {
      if (i < Math.floor(names.length / 2)) j.push('✅')
      else j.push('❌')
    }
    const judgies = shuffle(j)
    setJudgements(judgies)
  }

  const shuffle = (a) => {
    const array = [...a]
    let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
    while (currentIndex !== 0) {

    // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

    // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }

  const drop = () => {
    console.log(4)
    const n = []
    for (let i = 0; i < shuffledNames[1].length; i++) {
      if (judgements[i] === '✅') {
        n.push(shuffledNames[1][i])
      }
    }
    setNames(n)
  }

  useEffect(() => {
    if (names.length <= 1) {
      return
    }
    console.log(0)
    setJudgements(
      names.map(n => '❓')
    )
  }, [props.names])

  useEffect(() => {
    if (names.length <= 1 || judgements.length === 0) {
      return
    }
    if (judgements[0] === '❓') {
      console.log(1)
      setShuffledNames([-1,names])
      setTimeout(judge, 2000)
      return
    }
    console.log(2)
    const s = shuffle(names)
    setTimeout(() => setShuffledNames([1,s]), 2000)
  }, [judgements])

  useEffect(() => {
    if (names.length <= 1 || shuffledNames.length === 0 || judgements.length === 0) {
      return
    }
    console.log(3)
    const i = shuffledNames[0]
    if (i < 0) {
      return
    }
    if (i >= 7) {
      setTimeout(drop, 2000)
      return
    }
    const list = shuffledNames[1]
    const next = shuffle(list)
    setTimeout(()=> setShuffledNames([i+1, next]), 500)
  }, [shuffledNames])
  
  return names.length === 1 ? (
    <>
    <p>Winner: {names[0]}! jippii</p>
    <input type='button' value='Again' onClick={() => setNames([])}/>
    </>
  ) : (
    <>
    {shuffledNames.length ? (
      shuffledNames[1].map((n, i) => {
      return (
        <span key={i} style={{display: 'inline-block', width: '25%'}}>
          <div style={{overflow: 'hidden'}}>{n}</div>
          <div 
            style={{
              textAlign: 'center'
            }}>{judgements[i]}</div>
        </span>
      )
    })) : null}
    </>
  )
}

export function App(props) {
  const [names, setNames] = useState([])
  const [text, setText] = useState('')

  const gibNames = () => {
    setNames(text.split(','))
  }
  
  return (
    <div className='App'>
      <h1>TiPu bottel raffel doer (not rigged)</h1>
      {names.length === 0 ? (
        <>
        <p>Gib names pls (comma separated)</p>
        <input 
          type='text' 
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <input type='button' onClick={gibNames} value='Gib' />
        </>
      ) : <Raffel names={names} setNames={setNames} />}
      <h2>Coded from my iPhone</h2>
    </div>
  )
}