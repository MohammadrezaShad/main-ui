import {css} from '@styled/css';

import {IconChevronDown} from '@/assets';

interface CategorySelectProps {
  categories: string[];
  onChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({categories, onChange}) => (
  <div className={css({mb: '4'})}>
    <label className={css({display: 'block', mb: '2', fontWeight: 'medium'})} htmlFor='category'>
      Category
    </label>
    <div className={css({position: 'relative', w: 'full'})}>
      <select
        id='category'
        className={css({
          w: 'full',
          p: '4',
          borderWidth: '1px',
          borderColor: 'gray.300',
          _focus: {
            outline: '2px solid blue.400',
            outlineOffset: '2px',
          },
          appearance: 'none',
          rounded: '8px',
        })}
        onChange={e => onChange(e.target.value)}
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <IconChevronDown
        className={css({
          position: 'absolute',
          right: '6',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          w: '5',
          h: '5',
          fill: '#333333',
        })}
      />
    </div>
  </div>
);

export default CategorySelect;
