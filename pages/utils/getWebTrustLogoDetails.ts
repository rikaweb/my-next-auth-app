const logoMapping: Record<string, string> = {
  cacovidlogo: "/img/webtrust/covid/WebTrust-COVID19_original.jpg",
  casslcovidlogo: "/img/webtrust/covid/WebTrust-COVID19_BR-SSL.jpg",
  caevcovidlogo: "/img/webtrust/covid/WebTrust-COVID19_ExtendedValidation.jpg",
  caevscovidlogo: "/img/webtrust/covid/WebTrust-COVID19_EV-CodeSigning.jpg",
  cacodscovidlogo: "/img/webtrust/covid/WebTrust-COVID19_CodeSigning.jpg",
  calogo: "/img/webtrust/ca-logo.jpg",
  cassllogo: "/img/webtrust/cabrssl-logo.jpg",
  caevlogo: "/img/webtrust/caev-logo.jpg",
  caevslogo: "/img/webtrust/caevs-logo.jpg",
  cacodslogo: "/img/webtrust/cacs-logo.jpg",
  vmslogo: "/img/webtrust/WebTrust_VMC_Seal.jpg",
  csblogo: "/img/webtrust/webtrust-csb-seal.jpg",
  nslogo: "/img/webtrust/network-security-logo.jpg",
  smimelogo: "/img/webtrust/webtrust-s-mime-logo.jpg",
  ralog: "/img/webtrust/registration-authority-logo.jpg",
  caquallogo: "/img/webtrust/qualified-ca-logo1.jpg",
  brssllogo: "/img/webtrust/qualified-br-ssl-logo1.jpg",
  evssllogo: "/img/webtrust/qualified-ev-ssl-logo1.jpg",
  vmclogo: "/img/webtrust/qualified-vmc-logo1.jpg",
  brlogo: "/img/webtrust/qualified-code-signing-br-logo1.jpg",
  nsquallogo: "/img/webtrust/qualified-network-security-logo1.jpg",
  smimequallogo: "/img/webtrust/qualified-s-mime-logo1.jpg",
  raquallogo: "/img/webtrust/qualified-ra-logo1.jpg",
};

export const getWebTrustLogoSrc = (sealType: string): string => {
  let sealTypeLogo = "";
  switch (sealType) {
    case "CA":
      sealTypeLogo = "calogo";
      break;
    case "CA Extended Validation Code Signing":
      sealTypeLogo = "caevslogo";
      break;
    case "CA Extended Validation SSL":
      sealTypeLogo = "caevlogo";
      break;
    case "CA SSL Baseline":
      sealTypeLogo = "cassllogo";
      break;
    case "CA Code Signing":
      sealTypeLogo = "cacodslogo";
      break;
    case "Covid CA":
      sealTypeLogo = "cacovidlogo";
      break;
    case "Covid CA Extended Validation Code Signing":
      sealTypeLogo = "caevscovidlogo";
      break;
    case "Covid CA Extended Validation SSL":
      sealTypeLogo = "caevcovidlogo";
      break;
    case "Covid CA SSL Baseline":
      sealTypeLogo = "casslcovidlogo";
      break;
    case "Covid CA Code Signing":
      sealTypeLogo = "cacodscovidlogo";
      break;
    case "Verified Mark Certificate":
      sealTypeLogo = "vmslogo";
      break;
    case "Code Signing Baseline Requirements":
      sealTypeLogo = "csblogo";
      break;
    case "Network Security":
      sealTypeLogo = "nslogo";
      break;
    case "S/MIME":
      sealTypeLogo = "smimelogo";
      break;
    case "Registration Authorities":
      sealTypeLogo = "ralogo";
      break;
    case "Qualified Report for CA":
      sealTypeLogo = "caquallogo";
      break;
    case "Qualified Report for BR SSL":
      sealTypeLogo = "brssllogo";
      break;
    case "Qualified Report for EV SSL":
      sealTypeLogo = "evssllogo";
      break;
    case "Qualified Report for VMC":
      sealTypeLogo = "vmclogo";
      break;
    case "Qualified Report for Code Signing BR":
      sealTypeLogo = "brlogo";
      break;
    case "Qualified Report for Network Security":
      sealTypeLogo = "nsquallogo";
      break;
    case "Qualified Report for S/MIME":
      sealTypeLogo = "smimequallogo";
      break;
    case "Qualified Report for RA":
      sealTypeLogo = "raquallogo";
      break;
    default:
      sealTypeLogo = "";
  }

  return logoMapping[sealTypeLogo] || "";
};
