import { getGuide } from "../data/guides";
import { allServices, companies } from "../data/services";
import { guidePath } from "./site";

/**
 * 업무·업체 페이지에 붙은 guideLink가 실제 기둥 글을 가리키는지 빌드 때
 * 검사합니다. guides.ts가 services.ts를 참조하고 있어서, 반대 방향 검사는
 * 순환 참조를 피하려고 이 파일에 따로 두었습니다.
 */
(function assertGuideLinks() {
  const sources: { where: string; slug: string }[] = [];

  for (const { company, service } of allServices) {
    if (service.guideLink) {
      sources.push({
        where: `${company.slug}/${service.slug}`,
        slug: service.guideLink.slug,
      });
    }
  }
  for (const company of companies) {
    if (company.guideLink) {
      sources.push({ where: company.slug, slug: company.guideLink.slug });
    }
  }

  for (const source of sources) {
    if (!getGuide(source.slug)) {
      throw new Error(
        `[guide-link] ${source.where}: 없는 기둥 글입니다 — ${source.slug}`
      );
    }
  }
})();

export type GuideLink = { slug: string; text: string };

/** guideLink를 화면에 그릴 수 있는 형태로 바꿉니다. 없는 글이면 null. */
export function resolveGuideLink(link?: GuideLink) {
  if (!link) return null;

  const guide = getGuide(link.slug);
  if (!guide) return null;

  return { href: guidePath(guide.slug), title: guide.title, text: link.text };
}
