import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseRelevant from '../courseRelevant';

describe('CourseRelevant Component', () => {
  it('deve renderizar o ícone do Zap', () => {
    render(<CourseRelevant />);
    const zapIcon = screen.getByTestId('zap-icon');
    expect(zapIcon).toBeInTheDocument();
    expect(zapIcon).toHaveClass('text-yellow-300');
  });

  it('deve mostrar o conteúdo do hover ao passar o mouse sobre o ícone', async () => {
    render(<CourseRelevant />);
    const trigger = screen.getByTestId('hover-trigger');
    
    // Hover do ícone
    await userEvent.hover(trigger);
    
    // Verifique se o conteúdo do hover está visível
    const hoverContent = await screen.findByText('Seu curso possui alta relevância nas avaliações');
    expect(hoverContent).toBeInTheDocument();
    expect(hoverContent).toHaveClass('text-sm');
    
    // Unhover
    await userEvent.unhover(trigger);
  });

  it('deve ter o estilo correto para o contêiner de ícones', () => {
    render(<CourseRelevant />);
    const container = screen.getByTestId('hover-trigger');
    expect(container).toHaveClass('bg-black', 'w-fit', 'p-0.5', 'rounded-[4px]');
  });
});