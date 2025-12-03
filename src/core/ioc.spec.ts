import { createIoCContainer } from './ioc';

describe('createIoCContainer', () => {
  it('should create a container and allow service registration and resolution', () => {
    const schema = { serviceA: null, serviceB: null };
    const { container, implementations } = createIoCContainer(schema);

    implementations.serviceA = () => 'This is service A';
    implementations.serviceB = () => 'This is service B';

    expect(container.serviceA).toBe('This is service A');
    expect(container.serviceB).toBe('This is service B');
  });

  it('should allow retrieving the registered implementation fabric', () => {
    const schema = { serviceA: null };
    const { implementations } = createIoCContainer(schema);

    const serviceAImplementation = () => 'Service A';
    implementations.serviceA = serviceAImplementation;

    expect(implementations.serviceA).toBe(serviceAImplementation);
  });

  it('should throw an error if a service is accessed without being registered', () => {
    const schema = { serviceA: null };
    const { container } = createIoCContainer(schema);

    expect(() => container.serviceA).toThrow('service implementation serviceA not registered');
  });

  it('should throw an error if a service implementation is set after the service is instantiated', () => {
    const schema = { serviceA: null };
    const { container, implementations } = createIoCContainer(schema);

    implementations.serviceA = () => 'Service A';
    expect(container.serviceA).toBe('Service A');

    expect(() => {
      implementations.serviceA = () => 'New Service A';
    }).toThrow("can't set implementation of serviceA after it has been instantiated");
  });

  it('should throw an error for cyclic dependencies', () => {
    const schema = { serviceA: null, serviceB: null };

    const { container, implementations } = createIoCContainer(schema);

    implementations.serviceA = c => c.serviceB;
    implementations.serviceB = c => c.serviceA;

    expect(() => container.serviceA).toThrow('cyclic dependency on getting serviceA service');
  });

  it('should resolve services based on their dependencies', () => {
    const schema = { serviceA: null, serviceB: null };

    const { container, implementations } = createIoCContainer(schema);

    implementations.serviceA = () => 'Service A';
    implementations.serviceB = c => `Service B depends on ${c.serviceA}`;

    expect(container.serviceA).toBe('Service A');
    expect(container.serviceB).toBe('Service B depends on Service A');
  });

  it('should instantiate services only once and cache the result', () => {
    const schema = { serviceA: null };
    const { container, implementations } = createIoCContainer(schema);

    const implementationSpy = jest.fn(() => ({ value: 'Cached Service A' }));
    implementations.serviceA = implementationSpy;

    const firstInstance = container.serviceA;
    const secondInstance = container.serviceA;

    expect(firstInstance).toEqual({ value: 'Cached Service A' });
    expect(secondInstance).toBe(firstInstance); // Should return the same instance
    expect(implementationSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if cyclic dependencies occur indirectly', () => {
    const schema = { serviceA: null, serviceB: null, serviceC: null };

    const { container, implementations } = createIoCContainer(schema);

    implementations.serviceA = c => c.serviceB;
    implementations.serviceB = c => c.serviceC;
    implementations.serviceC = c => c.serviceA;

    expect(() => container.serviceA).toThrow('cyclic dependency on getting serviceA service');
  });
});
