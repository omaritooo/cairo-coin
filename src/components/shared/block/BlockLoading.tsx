import { AnimatePresence, motion } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";

export const BlockLoading = () => (
	<div className="flex-1 w-full py-6 rounded-lg my-7 ">
		<AnimatePresence>
			<motion.div
				{...variants}
				className="flex items-center justify-center h-full"
			>
				<div className="w-20 h-20 rounded-full bg-violet-800 animate-ping" />
			</motion.div>
		</AnimatePresence>
	</div>
);
