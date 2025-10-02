import './Styles/Greet.css';

export default function Greet({ title, message }) {
  return (
    <section className='greet'>
      <h1>{title}</h1>
      <p>{message}</p>
    </section>
  );
}
