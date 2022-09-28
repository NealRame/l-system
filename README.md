# L-System

An implementation of Lindenmayer Systems for your React application.

## Installation
```sh
> npm install @nealrame/react-l-system
```

## Example

```jsx
import * as React from "react"

import { LSystemSVGRenderer } from "@nealrame/l-system"

const app = () => {
    return <LSystemSVGRenderer
        axiom={["F", "-", "-", "F", "-", "-", "F"]}
        productionRules={{
            "F": ["F", "+", "F", "-", "-", "F", "+", "F"],
        }}
        renderingRules={{
            "F": ["forward", 1],
            "+": ["turn",  Math.PI/3],
            "-": ["turn", -Math.PI/3],
        }}
        steps="4"
        backgroundColor="#171717"
        strokeColor="#7ae4ff"
    />
}
```

Which should produce something like :
<div style="background-color: black">
    <p align="center">
        <img src="./docs/images/koch_snowflake.png"/>
    </p>
</div>