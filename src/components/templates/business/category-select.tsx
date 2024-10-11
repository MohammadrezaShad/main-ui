import {css} from '@styled/css';

interface CategorySelectProps {
  categories: string[];
  onChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({categories, onChange}) => (
  <div className={css({mb: '4'})}>
    <label className={css({display: 'block', mb: '2', fontWeight: 'medium'})} htmlFor='category'>
      Category
    </label>
    <select
      id='category'
      className={css({
        w: 'full',
        p: '6',
        borderWidth: '1px',
        borderColor: 'gray.300',
        _focus: {
          outline: '2px solid blue.400',
          outlineOffset: '2px',
        },
      })}
      onChange={e => onChange(e.target.value)}
    >
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

export default CategorySelect;
