import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function valueToAngle(val) {
    const subval = val * 1.5;
    if (val > 50) {
        return 0 + (subval - 75) * -1;
    } else {
        return 0 + (75 - subval) * 1;
    }
}

function Gauge({ labels, value }) {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('filled');
        }
        if (!inView) {
            controls.start('default');
        }
    }, [controls, inView]);

    const gaugeVariants = {
        default: { transform: `rotate(90deg)` },
        filled: {
            transform: `rotate(${valueToAngle(value)}deg)`,
            transition: { duration: 1 },
        }
    }

    return (
        <div className="gauge">
            <div className="gauge-body">
                <div className="gauge-1" />
                <div className="gauge-2" />
                <div className="gauge-3" />
                <div className="gauge-4" />
                <div className="gauge-5" />
                <div className="gauge-pointer-body" />
                <motion.div className="gauge-pointer" initial="default" animate={controls} variants={gaugeVariants} ref={ref} />
            </div>
            {labels && labels[0] && <span className="label-1">{ labels[0] }</span>}
            {labels && labels[1] && <span className="label-2">{ labels[1] }</span>}
            {labels && labels[2] && <span className="label-3">{ labels[2] }</span>}
        </div>
    );
}
export default Gauge;