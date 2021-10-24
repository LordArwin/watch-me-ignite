import { SideBar } from './components/SideBar';

import { api } from './services/api';

import './styles/global.scss';

import { Content } from './components/Content';
import { useEffect, useState } from 'react';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);


  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar id={selectedGenreId} title={selectedGenre.title} handleGenre={(id:number)=>{handleClickButton(id)}}/>
      <Content id={selectedGenreId} title={selectedGenre.title} ></Content>
    </div>
  )
}