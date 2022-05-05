import LazyLoad from 'react-dom-lazyload-component';
import Loading from './Loading';

const catNamesBase = ['Tom', 'Jerry', 'Michael', 'Ninja', 'Samurai'];
const catNames = [
  ...catNamesBase,
  ...catNamesBase,
  ...catNamesBase,
  ...catNamesBase,
  ...catNamesBase,
];
const personalities = [
  'Energetic Fighter',
  'Good Sleeper',
  'Cool Creator',
  'Advanced Executive',
];
const owners = [''];

const rand = (max: number): number => Math.floor(Math.random() * max);

const initShowIndex = 2;

const CatItem = ({ name }: { name: string }) => (
  <li className='py-2 flex flex-wrap'>
    <img src={`cat${rand(4) + 1}.jpg`} alt={name} width={640 / 2} />
    <article className='flex flex-col pl-2'>
      <h3>{name}</h3>
      <ul>
        <li>Age: {rand(10)}</li>
        <li>Personality: {personalities[rand(personalities.length)]}</li>
      </ul>
    </article>
  </li>
);

export default function Main() {
  return (
    <article className='py-2'>
      <h2>Your Best Cats!!</h2>
      <p className='py-2'>
        Post the information about your cat and share it with everyone!!
      </p>
      <ul id='cat-list' className='flex flex-col h-[640px] overflow-y-scroll'>
        {catNames.map((name, index) => {
          if (index <= initShowIndex) {
            return (
              <li>
                <CatItem key={index} name={name} />
              </li>
            );
          }
          return (
            <LazyLoad
              key={index}
              rootId='cat-list'
              InvisibleComponent={<Loading />}
              as='li'
            >
              <CatItem name={name} />
            </LazyLoad>
          );
        })}
      </ul>
    </article>
  );
}
