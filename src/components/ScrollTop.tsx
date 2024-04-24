import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { Affix, Button, Transition, rem } from "@mantine/core";

export default function ScrollTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }} className="hidden">
      <Transition transition="slide-up" mounted={scroll.y > 400}>
        {(transitionStyles) => (
          <Button
            leftSection={
              <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
            }
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
}
