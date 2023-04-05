/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div
    className="p-3 my-3 rounded border border-red-500 bg-red-200 text-red-700"
    role="alert"
  >
    <div className="flex flex-row">{children} </div>
  </div>
);

export const customErrorHandler = {
  // Parser errors

  /** `2 3` */
  numberWhitespace: function numberWhitespace() {
    return (
      <Wrapper>
        On ne peut pas avoir d&apos;espaces à l&apos;intérieur des nombres
      </Wrapper>
    );
  },

  /** `1.2.3` */
  invalidNumber: function invalidNumber() {
    return <Wrapper>Numéro invalide</Wrapper>;
  },

  /** `2+*3` */
  adjecentOperator: function adjecentOperator() {
    return <Wrapper>Deux opérateurs ne peuvent pas être adjacents</Wrapper>;
  },

  /** `2 & 3` */
  invalidChar: function invalidChar(_ref: { character: string }) {
    const character = _ref.character;
    return <Wrapper>{"Caractère non valide '".concat(character, "'")}</Wrapper>;
  },

  /** `* 3` */
  invalidUnary: function invalidUnary(_ref2: { symbol: string }) {
    const symbol = _ref2.symbol;
    return (
      <Wrapper>
        {"'".concat(symbol, "' ne peut pas être un opérateur unaire")}
      </Wrapper>
    );
  },

  /** Theoretical case, no known reproduction */
  multipleExpressions: function multipleExpressions() {
    return (
      <Wrapper>
        Une erreur d&apos;analyse inattendue s&apos;est produite
      </Wrapper>
    );
  },

  /** `[[1,2][1,2,3]]` */
  matrixMixedDimension: function matrixMixedDimension(_ref3: {
    lengthExpected: number;
    lengthReceived: number;
  }) {
    const lengthExpected = _ref3.lengthExpected,
      lengthReceived = _ref3.lengthReceived;
    return (
      <Wrapper>
        {'Matrix-row a une longueur '
          .concat(lengthReceived.toString(), ', mais devrait être ')
          .concat(lengthExpected.toString())}
      </Wrapper>
    );
  },

  /** `[[]]` */
  matrixEmpty: function matrixEmpty() {
    return <Wrapper>La matrice doit contenir au moins une expression</Wrapper>;
  },

  /** `[]` */
  vectorEmpty: function vectorEmpty() {
    return <Wrapper>Le vecteur doit contenir au moins une expression</Wrapper>;
  },

  /** Closing an un-opened parenthesis, `2+3)` */
  expectedEnd: function expectedEnd() {
    return <Wrapper>Fin d&apos;équation attendue</Wrapper>;
  },

  /** `[2,3` */
  expectedSquareBracket: function expectedSquareBracket() {
    return <Wrapper>Crochet fermant manquant</Wrapper>;
  },

  /** `5 * (2 + 3` */
  expectedCloseParens: function expectedCloseParens() {
    return <Wrapper>Parenthèse fermante manquante</Wrapper>;
  },

  /** `2 + 3 +` */
  operatorLast: function operatorLast() {
    return (
      <Wrapper>
        L&apos;équation ne peut pas se terminer par un opérateur
      </Wrapper>
    );
  },

  /** `()` */
  emptyBlock: function emptyBlock() {
    return <Wrapper>Les parenthèses doivent avoir un contenu</Wrapper>;
  },
  // Resolver errors
  functionUnknown: function functionUnknown(_ref4: { name: string }) {
    const name = _ref4.name;
    return <Wrapper>{'Fonction inconnue '.concat(name)}</Wrapper>;
  },
  functionArgLength: function functionArgLength(_ref5: {
    name: string;
    minArgs: number;
    maxArgs: number;
  }) {
    const name = _ref5.name,
      minArgs = _ref5.minArgs,
      maxArgs = _ref5.maxArgs;
    return (
      <Wrapper>
        {minArgs === maxArgs
          ? ''
              .concat(name, ' doit avoir ')
              .concat(minArgs.toString(), ' arguments')
          : ''
              .concat(name, ' doit avoir ')
              .concat(minArgs.toString(), '-')
              .concat(maxArgs.toString(), ' arguments')}
      </Wrapper>
    );
  },
  functionNumberOnly: function functionNumberOnly(_ref6: { name: string }) {
    const name = _ref6.name;
    return (
      <Wrapper>
        {'Arguments de '.concat(name, ' doivent être des nombres sans unité')}
      </Wrapper>
    );
  },
  functionSqrt1Positive: function functionSqrt1Positive(_ref7: {
    name: string;
  }) {
    const name = _ref7.name;
    return (
      <Wrapper>
        {'Premier argument de '.concat(name, ' doit être positif')}
      </Wrapper>
    );
  },
  functionRoot1PositiveInteger: function functionRoot1PositiveInteger(_ref8: {
    name: string;
  }) {
    const name = _ref8.name;
    return (
      <Wrapper>
        {'Premier argument de '.concat(name, ' doit être un entier positif')}
      </Wrapper>
    );
  },
  functionRoot2Positive: function functionRoot2Positive(_ref9: {
    name: string;
  }) {
    const name = _ref9.name;
    return (
      <Wrapper>
        {'Deuxième argument de '.concat(name, ' doit être positif')}
      </Wrapper>
    );
  },
  functionSum1Variable: function functionSum1Variable(_ref10: {
    name: string;
    variableType: string;
  }) {
    const name = _ref10.name,
      variableType = _ref10.variableType;
    return (
      <Wrapper>
        {'Premier argument de '
          .concat(name, ' doit être une variable, était ')
          .concat(variableType)}
      </Wrapper>
    );
  },
  functionSum2Integer: function functionSum2Integer(_ref11: { name: string }) {
    const name = _ref11.name;
    return (
      <Wrapper>
        {'Deuxième argument de '.concat(name, ' doit être un entier')}
      </Wrapper>
    );
  },
  functionSum3Integer: function functionSum3Integer(_ref12: { name: string }) {
    const name = _ref12.name;
    return (
      <Wrapper>
        {'Troisième argument de '.concat(name, ' doit être un entier')}
      </Wrapper>
    );
  },
  variableUnknown: function variableUnknown(_ref13: { name: string }) {
    const name = _ref13.name;
    return <Wrapper>{'Variable inconnue '.concat(name)}</Wrapper>;
  },
  plusDifferentUnits: function plusDifferentUnits() {
    return (
      <Wrapper>
        Impossible d&apos;ajouter des nombres avec des unités différentes
      </Wrapper>
    );
  },
  plusMatrixMismatch: function plusMatrixMismatch(_ref14: {
    aDimensions: string;
    bDimensions: string;
  }) {
    const aDimensions = _ref14.aDimensions,
      bDimensions = _ref14.bDimensions;
    return (
      <Wrapper>
        {"Impossible d'ajouter des matrices de dimensions "
          .concat(aDimensions, ' et ')
          .concat(bDimensions)}
      </Wrapper>
    );
  },
  plusminusUnhandled: function plusminusUnhandled() {
    return (
      <Wrapper>
        L&apos;opérateur plus-moins n&apos;est actuellement pas pris en charge
      </Wrapper>
    );
  },
  scalarProductUnbalanced: function scalarProductUnbalanced(_ref15: {
    aLength: number;
    bLength: number;
  }) {
    const aLength = _ref15.aLength,
      bLength = _ref15.bLength;
    return (
      <Wrapper>
        {'Impossible de calculer le produit scalaire (point) de vecteurs de taille '
          .concat(aLength.toString(), ' et ')
          .concat(bLength.toString())}
      </Wrapper>
    );
  },
  vectorProduct3VectorOnly: function vectorProduct3VectorOnly() {
    return (
      <Wrapper>Le produit vectoriel (croisé) nécessite 2 3 vecteurs</Wrapper>
    );
  },
  matrixProductMatrixMismatch: function matrixProductMatrixMismatch(_ref16: {
    aDimensions: string;
    bDimensions: string;
  }) {
    const aDimensions = _ref16.aDimensions,
      bDimensions = _ref16.bDimensions;
    return (
      <Wrapper>
        {'Impossible de multiplier les matrices de dimensions '
          .concat(aDimensions, ' et ')
          .concat(bDimensions)}
      </Wrapper>
    );
  },
  multiplyImplicitNoVectors: function multiplyImplicitNoVectors() {
    return (
      <Wrapper>
        Impossible de multiplier les vecteurs sans symbole, utilisez un point ou
        une croix
      </Wrapper>
    );
  },
  divideNotZero: function divideNotZero() {
    return <Wrapper>Impossible de diviser par zéro</Wrapper>;
  },
  divideMatrixMatrix: function divideMatrixMatrix() {
    return <Wrapper>Impossible de diviser les matrices entre elles</Wrapper>;
  },
  powerUnitlessNumberExponent: function powerUnitlessNumberExponent() {
    return <Wrapper>L&apos;exposant doit être un nombre sans unité</Wrapper>;
  },
  operatorInvalidArguments: function operatorInvalidArguments(_ref17: {
    operator: string;
    a: string;
    b: string;
  }) {
    const operator = _ref17.operator,
      a = _ref17.a,
      b = _ref17.b;
    return (
      <Wrapper>
        {"Operateur '"
          .concat(operator, "' pas défini pour ")
          .concat(a, ' et ')
          .concat(b)}
      </Wrapper>
    );
  },
  noComparison: function noComparison() {
    return <Wrapper>Impossible d&apos;évaluer une comparaison</Wrapper>;
  },
  matrixDifferentUnits: function matrixDifferentUnits() {
    return (
      <Wrapper>
        Toutes les cellules de la matrice doivent avoir la même unité
      </Wrapper>
    );
  },
  matrixNoNesting: function matrixNoNesting() {
    return <Wrapper>Impossible d&apo;imbriquer les matrices</Wrapper>;
  },
  invalidEquation: function invalidEquation() {
    return <Wrapper>Impossible de résoudre une équation invalide</Wrapper>;
  },
  placeholder: function placeholder() {
    return <Wrapper>Impossible d&apos;évaluer un espace réservé</Wrapper>;
  },
  invalidUnit: function invalidUnit() {
    return <Wrapper>Doit être une unité valide</Wrapper>;
  },
  // Render errors
  variableResolution: function variableResolution(_ref18: {
    name: string;
    errorMessage: ReactNode;
  }) {
    const name = _ref18.name,
      errorMessage = _ref18.errorMessage;
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      "Échec de l'évaluation ",
      name,
      ': ',
      errorMessage
    );
  },
  variableNaming: function variableNaming(_ref19: { name: String }) {
    const name = _ref19.name;
    return (
      <Wrapper>
        {"Nom de variable invalide '".concat(name.toString(), "'")}
      </Wrapper>
    );
  },
  functionSignature: function functionSignature(_ref20: { signature: String }) {
    const signature = _ref20.signature;
    return (
      <Wrapper>
        {"Signature de fonction invalide '".concat(signature.toString(), "'")}
      </Wrapper>
    );
  },
};
