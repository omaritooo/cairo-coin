import { SVGMotionProps, motion } from "framer-motion";

type Variants = {
  closed: {
    d?: string;
    opacity?: number;
  };
  open: { d?: string; opacity?: number };
};

type Transition = {
  duration: number;
};
interface PathProps extends SVGMotionProps<SVGPathElement> {
  // Add any additional specific props you want to support
  variants: Variants;
  transition?: Transition;
}
const Path: React.FC<PathProps> = (props) => (
  <motion.path
    fill="transparent"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    strokeWidth="3"
    {...props}
  />
);

export const ButtonMobileToggle = ({ toggle }: { toggle: () => void }) => (
  <button onClick={toggle} type="button">
    <svg height="23" viewBox="0 0 23 23" width="23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        transition={{ duration: 0.1 }}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);
