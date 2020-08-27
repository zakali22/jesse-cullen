import "../styles/index.scss"
// import "./smoothScroll"; /* Debug later on or find an alternative (last course has smooth scrolling) */

import {gsap, TweenMax, TimelineMax} from "gsap";
import ScrollMagic from "scrollmagic";
// import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'; // For indicators on scrollmagic
import { ScrollScene, addIndicators  } from 'scrollscene'

const heroSection = document.querySelector('.hero')
const heroSectionEls = heroSection.querySelectorAll('.hero__title, .hero__subtitle, .hero__arrow')
const heroArrow = heroSection.querySelector('.hero__arrow')
const mainSection = document.querySelector('main')
const blobs = document.querySelector('.blobs')
const gallery = document.querySelectorAll('.gallery')

// Timelines 
const loadFadeInTl = new TimelineMax({
    onComplete: function(){
        heroArrow.style.animation = "upDown .7s ease-in-out infinite alternate"
    }
})
loadFadeInTl
    .set(heroSectionEls, {opacity: 0})
    .set(blobs, {opacity: 0})
    .to(heroSectionEls, {opacity: 1, duration: 2.5, stagger: 0.4, delay: .8})
    .to(blobs, {opacity: .7, duration: 1.3}, "-=2.45")


// Tweens
const fadeTween = gsap.timeline({ paused: true })
fadeTween
    .to(heroSection, {scale: .9, opacity: 0});
    // .to(heroSection, {opacity: 0, duration: .2})
    

const blobScaleTween = gsap.timeline({paused: true})
blobScaleTween
    .to(blobs.children[0], {scale: 5, x: 100, duration: 1.5, ease: 'linear.easeNone'})

const blobRotateTween = gsap.timeline({paused: true})
blobRotateTween
    .to(blobs.children[0], {rotate: 45, y: -20, duration: 1.5, ease: 'linear.easeNone'})

const blobRotateAltTween = gsap.timeline({paused: true})
blobRotateAltTween
    .to(blobs.children[0], {rotate: 0, scale: 4, y: 50, duration: 1.5, ease: 'linear.easeNone'})

// Scrollmagic
// const controller1 = new ScrollMagic.Controller();
// const scene1 = new ScrollMagic.Scene({triggerElement: mainSection, offset: -50})
// scene1
//     .setTween(TweenMax.to(heroSection, {opacity: 0, duration: 4}))
//     .addIndicators({name: 'fade in'})
//     .addTo(controller1)


// Hero scrollscene
const scene1 = new ScrollScene({
    triggerElement: mainSection,
    // forwardSpeed: 0.8,
    // reverseSpeed: 1,
    duration: "100%", // if you want things to move as you scroll
    gsap: {
        timeline: fadeTween
    }
})



// Blob scrollscene
const blobScene = new ScrollScene({
    triggerElement: mainSection, 
    triggerHook: .5, // 70% from the bottom
    gsap: {
        timeline: blobScaleTween
    }
})

const blobScene2 = new ScrollScene({
    triggerElement: gallery[1], 
    triggerHook: .5, // 70% from the bottom
    gsap: {
        timeline: blobRotateTween
    }
})

const blobScene3 = new ScrollScene({
    triggerElement: gallery[2], 
    triggerHook: .5, // 70% from the bottom
    duration: "100%",
    toggle: {
        element: blobs.children[0],
        className: 'fill-purple'
    }
})

const blobScene4 = new ScrollScene({
    triggerElement: gallery[3], 
    triggerHook: .5, // 70% from the bottom
    gsap: {
        timeline: blobRotateAltTween
    }
})


// Images scrollscene
let controller1 = null;
for(let i = 0; i < gallery.length; i++){
    const scrollImageTween = gsap.timeline({paused: true})
    scrollImageTween.fromTo(gallery[i].children[0].children[1], {y: 0}, {y: 300, ease: "linear.easeNone"})
    
    const scene2 = new ScrollScene({
        triggerElement: gallery[i],
        triggerHook: .7,
        duration: gallery[i], // The height of the current gallery
        reverse: true,
        gsap: {
            timeline:  scrollImageTween
        }, 
        useGlobalController: false
    })

    if(!controller1){
        controller1 = scene2.Controller;
    }

    scene2.Scene.addIndicators({ name: `scene${i}`, colorEnd: '#2d2d2d' })
}