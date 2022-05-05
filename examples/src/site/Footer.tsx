const items: { [key: string]: string[] } = {
  Country: ['USA', 'UK', 'Japan', 'China', 'Korea'],
  Company: ['About Us', 'Contact Us', 'Careers', 'Press'],
};

export default function Footer() {
  return (
    <ul className='flex flex-wrap'>
      {Object.entries(items).map(([title, contents]) => (
        <li key={title} className='mx-2'>
          <h3>{title}</h3>
          <ul className='flex flex-col'>
            {contents.map(content => (
              <li
                key={content}
                className='py-1 text-sm cursor-pointer hover:underline'
              >
                {content}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
