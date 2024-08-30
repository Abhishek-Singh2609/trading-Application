import React from 'react'
import{rende,render,screen}  from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Hero from "../landing_page/home/Hero"

describe("Hero Component",()=>{
    test('renders Hero Image',()=>{
        render(<Hero />);
        const heroImage= screen.getByAltText("Hero Image");
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute("src","media/images/homeHero.png")
    });
    test('renders Signup now Button',()=>{
        render(<Hero />);
        const button= screen.getByRole("button","Signup Now");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("btn-primary")
    });
});