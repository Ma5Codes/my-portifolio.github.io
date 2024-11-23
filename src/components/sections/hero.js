import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);
  const one = <h1>Hello! My name is</h1>;
  const two = <h2 className="big-heading">Habu Matano</h2>;
  const three = <h3 className="medium-heading">Tech Enthusiast | Web Developer | Web Designer</h3>;
  const four = (
    <>
      <p>
        <b>I build accessible, pixel-perfect digital experiences for the web</b>
      </p>
  
      <p>
        I am Habu, a final-year computer science student and alumnus of {' '}
        <a href="https://www.mut.ac.ke">Murang'a University of Technology</a>, passionate about creating intuitive and high-performance web applications.
      </p>
  
      <p>
        Currently, I'm enhancing my skills in React.js, Node.js, and TypeScript to build responsive, user-centered web experiences. When I'm not coding, you can find me exploring new design ideas on {' '}
        <a href="https://www.freecodecamp.org/">freeCodeCamp</a> or sharing my project journey on {' '}
        <a href="https://www.linkedin.com">LinkedIn</a> and GitHub.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.linkedin.com/in/habu-matano"
      target="_blank"
      rel="noreferrer">
      Connect with me on LinkedIn!
    </a>
  );
  

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;