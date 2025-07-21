// import { useEffect, useRef } from 'react';
// import { motion, useMotionValue, useSpring } from 'framer-motion';
// import styled from 'styled-components';

// const Cursor = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 4px;
//   height: 40px;
//   background: cyan;
//   pointer-events: none;
//   border-radius: 2px;
//   box-shadow: 0 0 8px cyan;
//   z-index: 9999;
//   transform-origin: center;
// `;

// const CursorLightsaber = () => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const angle = useMotionValue(0);

//   const smoothX = useSpring(x, { stiffness: 1000, damping: 80 });
//   const smoothY = useSpring(y, { stiffness: 1000, damping: 80 });
//   const smoothAngle = useSpring(angle, { stiffness: 500, damping: 50 });

//   const lastPos = useRef({ x: 0, y: 0 });
//   const swingAudio = useRef<HTMLAudioElement | null>(null);
//   const idleAudio = useRef<HTMLAudioElement | null>(null);
//   const ignitionAudio = useRef<HTMLAudioElement | null>(null);

//   // const stopAllAudio = () => {
//   //   ignitionAudio.current?.pause();
//   //   ignitionAudio.current?.removeAttribute('src');
//   //   idleAudio.current?.pause();
//   //   idleAudio.current?.removeAttribute('src');
//   //   swingAudio.current?.pause();
//   //   swingAudio.current?.removeAttribute('src');
//   // };

//   // useEffect(() => {
//   //   ignitionAudio.current = new Audio('/lightsaber-ignition.mp3')
//   //   ignitionAudio.current.volume = 0.4

//   //   idleAudio.current = new Audio('/lightsaber-idle.mp3')
//   //   idleAudio.current.loop = true
//   //   idleAudio.current.volume = 0.1

//   //   const handleFirstInteraction = () => {
//   //     ignitionAudio.current?.play().catch(() => {})
//   //     idleAudio.current?.play().catch(() => {})
//   //     window.removeEventListener('mousedown', handleFirstInteraction)
//   //   }

//   //   window.addEventListener('mousedown', handleFirstInteraction)

//   //   return () => {
//   //     window.removeEventListener('mousedown', handleFirstInteraction)
//   //   }
//   // }, [])

//   useEffect(() => {
//     const swing1 = new Audio('/lightsaber1.mp3');
//     const swing3 = new Audio('/lightsaber3.mp3');
//     swing1.volume = 0.2;
//     swing3.volume = 0.2;

//     let lastSwingTime = 0;

//     const handleMove = (e: MouseEvent) => {
//       const newX = e.clientX;
//       const newY = e.clientY;

//       const dx = newX - lastPos.current.x;
//       const dy = newY - lastPos.current.y;
//       const rad = Math.atan2(dy, dx);
//       const deg = rad * (180 / Math.PI);

//       lastPos.current = { x: newX, y: newY };
//       x.set(newX);
//       y.set(newY);
//       angle.set(deg + 90);

//       // Only trigger swing if fast enough and enough time has passed
//       const now = Date.now();
//       const dist = Math.hypot(dx, dy);
//       if (dist > 20 && now - lastSwingTime > 200) {
//         const sfx = Math.random() > 0.5 ? swing1 : swing3;
//         sfx.currentTime = 0;
//         sfx.play().catch(() => {});
//         lastSwingTime = now;
//       }
//     };

//     window.addEventListener('mousemove', handleMove);
//     return () => window.removeEventListener('mousemove', handleMove);
//   }, []);

//   return (
//     <>
//       <Cursor
//         style={{
//           x: smoothX,
//           y: smoothY,
//           rotate: smoothAngle,
//         }}
//       />
//     </>
//   );
// };

// export default CursorLightsaber;
