/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {FC} from 'react';

type JsonLdScriptProps = {
  data: Record<string, any>;
  id?: string;
};

const JsonLdScript: FC<JsonLdScriptProps> = ({id, data}) => (
  <script
    id={id}
    type='application/ld+json'
    dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
  />
);

export default JsonLdScript;
