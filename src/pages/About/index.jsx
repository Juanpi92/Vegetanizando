import React from 'react'
import './styles.css'

export default function About() {
    return (
        <div className="about-container">
            <h1 className='about-title'>Você conhece a Vegetanizando?</h1>
            <AboutArticle
                image={'./imagenes/about/restaurant.jpg'}
                title={"Compromisso com a Veganização"}
                text={"O Vegetanizando é um restaurante vegano comprometido com a causa ambiental e a alimentação saudável. Fundado em 2021 em Campinas, o restaurante se expandiu para o Rio de Janeiro e tem planos ambiciosos de abrir lojas em todo o Brasil."}
            />
            <AboutArticle
                image={'./imagenes/about/menu.avif'}
                title={"Sabores Únicos e Cuidado com a Saúde"}
                text={"No Vegetanizando, os clientes podem desfrutar de um cardápio 100% natural e pratos exclusivos, como a Mini Carolina e aboborinha recheada. O restaurante preza pela saúde dos clientes, manipulando ingredientes com cuidado e valorizando profissionais altamente qualificados."}
            />
            <AboutArticle
                image={'./imagenes/about/mission.jpg'}
                title={"Levar o Veganismo a Todo o Brasil"}
                text={"A meta do Vegetanizando é estabelecer lojas em todo o país, tornando a alimentação vegana acessível a todos os brasileiros. Com foco na qualidade dos ingredientes e na preservação do meio ambiente, o restaurante busca se destacar na cena vegana do Brasil."}
            />
        </div>
    )
}

const AboutArticle = ({ image, title, text }) => {
    return (
        <article className='about-content'>
            <img src={image} alt="Imagem sobre nosso restaurante" className="article-media" />
            <div className="article-align-text">
                <p className="article-title">{title}</p>
                <p className="article-text">
                    {text}
                </p>
            </div>
        </article>

    )
}