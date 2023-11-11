import { styled } from "@styled/jsx";

export const Container = styled('footer', {
    base: {
        px: 8,
        py: 11,
        backgroundColor: 'backgroundSecondary',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
})

export const Wrap = styled('div', {
  base: {display: 'flex', alignItems: 'center'},
});
