import { ReactNode } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useInRouterContext,
  useLocation,
} from "react-router-dom";

export function SafeLink({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  const inRouter = useInRouterContext();
  if (inRouter) {
    return (
      <RouterLink to={to} className={className}>
        {children}
      </RouterLink>
    );
  }
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}

export function SafeNavLink({ to, className, activeClassName, children }: { to: string; className?: string; activeClassName?: string; children: ReactNode }) {
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : null;
  if (inRouter) {
    return (
      <RouterNavLink
        to={to}
        className={({ isActive }) => `${className ?? ""} ${isActive ? activeClassName ?? "" : ""}`.trim()}
      >
        {children}
      </RouterNavLink>
    );
  }
  const isActive = location ? location.pathname === to : false;
  return (
    <a href={to} className={`${className ?? ""} ${isActive ? activeClassName ?? "" : ""}`.trim()}>
      {children}
    </a>
  );
}
