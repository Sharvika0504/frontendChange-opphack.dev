import React from "react";
import { Parallax } from "react-parallax";
import Head from "next/head";

import {
  LayoutContainer,
  DetailsContainer,
  TitleBanner,
  DescriptionStyled,
} from "../../styles/nonprofits/apply/styles";

export default function ApplicationSubmittedPage() {
  var image = "/npo_placeholder.png";

  return (
    <LayoutContainer key="apply_form" container>
      <Head>
        <title>Nonprofit Application</title>
        <meta />
      </Head>

      <TitleBanner>
        <Parallax bgImage={image} strength={300}></Parallax>
      </TitleBanner>

      <DetailsContainer container>
        <DescriptionStyled>
          <h1 className="content__title">Nonprofit Project Application</h1>
          <div className="content__body">
            <div className="profile__header">
              <div className="profile__headline">
                <h4 className="profile__title">
                  Your application was submitted successfully!
                  <br />
                  <br />
                  We have received your request and will review it as soon as
                  possible.
                </h4>
              </div>
            </div>
          </div>
        </DescriptionStyled>
      </DetailsContainer>
    </LayoutContainer>
  );
}
